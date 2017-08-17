declare var document: any;
declare var window: any;

namespace InputMask {


}
export const InputMaskDefaultMask = {
    Phone: "(999) 999-9999"
};
export enum Keys {
    asterisk = 42,
    zero = 48,
    nine = 57,
    a = 65,
    z = 90,
    backSpace = 8,
    tab = 9,
    delete = 46,
    left = 37,
    right = 39,
    end = 35,
    home = 36,
    numberPadZero = 96,
    numberPadNine = 105,
    shift = 16,
    enter = 13,
    control = 17,
    escape = 27,
    v = 86,
    c = 67,
    x = 88
}
export class InputMask {
    formatCharacters: string[] = ["-", "_", "(", ")", "[", "]", ":", ".", ",", "$", "%", "@", " ", "/"];
    maskCharacters: string[] = ["A", "9", "*"];
    originalValue: string = "";
    mask: any = null;
    hasMask: boolean = false;
    forceUpper: boolean = false;
    forceLower: boolean = false;
    useEnterKey: boolean = false;
    validateDataType: boolean = false;
    dataType: any = null;

    between (x, a, b) {
        return x && a && b && x >= a && x <= b;
    }

    getCursorPosition (element) {
        let position = 0;

        if (document.selection) {
            element.focus();

            var selectRange = document.selection.createRange();

            selectRange.moveStart("character", -element.value.length);

            position = selectRange.text.length;
        } else if (element.selectionStart || element.selectionStart === "0") {
            position = element.selectionStart;
        }

        return position;
    }

    isValidCharacter (keyCode, maskCharacter) {
        const maskCharacterCode = maskCharacter.charCodeAt(0);

        if (maskCharacterCode === Keys.asterisk) {
            return true;
        }

        const isNumber = (keyCode >= Keys.zero && keyCode <= Keys.nine) ||
            (keyCode >= Keys.numberPadZero && keyCode <= Keys.numberPadNine);

        if (maskCharacterCode === Keys.nine && isNumber) {
            return true;
        }

        if (maskCharacterCode === Keys.a && keyCode >= Keys.a && keyCode <= Keys.z) {
            return true;
        }

        return false;
    }

    setCursorPosition (element, index) {
        if (element != null) {
            if (element.createTextRange) {
                var range = element.createTextRange();

                range.move("character", index);

                range.select();
            } else {
                if (element.selectionStart) {
                    element.focus();

                    element.setSelectionRange(index, index);
                } else {
                    element.focus();
                }
            }
        }
    };

    removeCharacterAtIndex (element, index) {
        if (element.value.length > 0) {
            const newElementValue = element.value.slice(0, index) + element.value.slice(index + 1);

            element.value = newElementValue;

            if (element.value.length > 0) {
                this.setCursorPosition(element, index);
            } else {
                element.focus();
            }
        }
    };

    insertCharacterAtIndex (element, index, character) {
        const newElementValue = element.value.slice(0, index) + character + element.value.slice(index);

        element.value = newElementValue;

        if (element.value.length > 0) {
            this.setCursorPosition(element, index + 1);
        } else {
            element.focus();
        }
    };

    checkAndInsertMaskCharacters (element, index) {
        while (true) {
            const isMaskCharacter = this.formatCharacters.indexOf(this.mask[index]) > -1;

            const maskAlreadyThere = element.value.charAt(index) === this.mask[index];

            if (isMaskCharacter && !maskAlreadyThere) {
                this.insertCharacterAtIndex(element, index, this.mask[index]);
            } else {
                return;
            }

            index += 1;
        }
    };

    checkAndRemoveMaskCharacters (element, index, keyCode) {
        if (element.value.length > 0) {
            while (true) {
                var character = element.value.charAt(index);

                var isMaskCharacter = this.formatCharacters.indexOf(character) > -1;

                if (!isMaskCharacter || index === 0 || index === element.value.length) {
                    return;
                }

                this.removeCharacterAtIndex(element, index);

                if (keyCode === Keys.backSpace) {
                    index -= 1;
                }

                if (keyCode === Keys.delete) {
                    index += 1;
                }
            }
        }
    };

    onLostFocus (element) {
        if (element.value.length > 0) {
            if (element.value.length !== this.mask.length) {
                element.value = "";
                return;
            }

            for (let i = 0; i < element.value; i++) {
                const elementCharacter = element.value.charAt(i);
                const maskCharacter = this.mask[i];

                if (this.maskCharacters.indexOf(maskCharacter) > -1) {
                    if (elementCharacter === maskCharacter || maskCharacter.charCodeAt(0) === Keys.asterisk) {
                        continue;
                    } else {
                        element.value = "";
                        return;
                    }
                } else {
                    if (maskCharacter.charCodeAt(0) === Keys.a) {
                        if (elementCharacter.charCodeAt(0) <= Keys.a || elementCharacter >= Keys.z) {
                            element.value = "";

                            return;
                        }
                    } else if (maskCharacter.charCodeAt(0) === Keys.nine) {
                        if (elementCharacter.charCodeAt(0) <= Keys.zero || elementCharacter >= Keys.nine) {
                            element.value = "";
                            return;
                        }
                    }
                }
            }
        }
    };

    onKeyDown (element, event) {
        let key = event.which;

        const copyCutPasteKeys = [Keys.v, Keys.c, Keys.x].indexOf(key) > -1 && event.ctrlKey;

        const movementKeys = [Keys.left, Keys.right, Keys.tab].indexOf(key) > -1;

        const modifierKeys = event.ctrlKey || event.shiftKey;

        if (copyCutPasteKeys || movementKeys || modifierKeys) {

            return true;
        }

        if (element.selectionStart === 0 && element.selectionEnd === element.value.length) {
            this.originalValue = element.value;

            element.value = "";
        }

        if (key === Keys.escape) {
            if (this.originalValue !== "") {
                element.value = this.originalValue;
            }

            return true;
        }

        if (key === Keys.backSpace || key === Keys.delete) {
            if (key === Keys.backSpace) {
                this.checkAndRemoveMaskCharacters(element, this.getCursorPosition(element) - 1, key);

                this.removeCharacterAtIndex(element, this.getCursorPosition(element) - 1);
            }

            if (key === Keys.delete) {
                this.checkAndRemoveMaskCharacters(element, this.getCursorPosition(element), key);

                this.removeCharacterAtIndex(element, this.getCursorPosition(element));
            }

            event.preventDefault();

            return false;
        }

        if (this.useEnterKey && key === Keys.enter) {

            event.preventDefault();

            return false;
        }

        if (element.value.length === this.mask.length) {
            event.preventDefault();

            return false;
        }

        if (this.hasMask) {
            this.checkAndInsertMaskCharacters(element, this.getCursorPosition(element));
        }

        if (this.isValidCharacter(key, this.mask[this.getCursorPosition(element)])) {
            if (key >= Keys.numberPadZero && key <= Keys.numberPadNine) {
                key = key - 48;
            }

            let character = event.shiftKey
                ? String.fromCharCode(key).toUpperCase()
                : String.fromCharCode(key).toLowerCase();

            if (this.forceUpper) {
                character = character.toUpperCase();
            }

            if (this.forceLower) {
                character = character.toLowerCase();
            }

            this.insertCharacterAtIndex(element, this.getCursorPosition(element), character);

            if (this.hasMask) {
                this.checkAndInsertMaskCharacters(element, this.getCursorPosition(element));
            }
        }

        event.preventDefault();

        return false;
    };

    onPaste (element, event, data) {
        let pastedText = "";

        if (data != null && data !== "") {
            pastedText = data;
        } else if (event != null && window.clipboardData && window.clipboardData.getData) {
            pastedText = window.clipboardData.getData("text");
        } else if (event != null && event.clipboardData && event.clipboardData.getData) {
            pastedText = event.clipboardData.getData("text/plain");
        }

        if (pastedText != null && pastedText !== "") {
            for (let j = 0; j < this.formatCharacters.length; j++) {
                pastedText.replace(this.formatCharacters[j], "");
            }

            for (let i = 0; i < pastedText.length; i++) {
                if (this.formatCharacters.indexOf(pastedText[i]) > -1) {
                    continue;
                }

                let keyDownEvent = document.createEventObject ? document.createEventObject() : document.createEvent("Events");

                if (keyDownEvent.initEvent) {
                    keyDownEvent.initEvent("keydown", true, true);
                }

                keyDownEvent.keyCode = keyDownEvent.which = pastedText[i].charCodeAt(0);

                this.onKeyDown(element, keyDownEvent);
            }
        }

        return false;
    };

    formatWithMask (element) {
        let value = element.value;

        element.value = "";

        if (value != null && value !== "") {
            this.onPaste(element, null, value);
        }
    };

    initialize (elements, options) {

        if (!elements || !options) {
            return;
        }

        if (options.mask && options.mask.length > 0) {
            this.mask = options.mask.split("");
            this.hasMask = true;
        }




        if (options.useEnterKey) {
            this.useEnterKey = options.useEnterKey;
        }

        [].forEach.call(elements, function (element) {

            element.onblur = () => {
                if (!element.getAttribute("readonly") && this.hasMask) {
                    return this.onLostFocus(element);
                }
                return true;
            };

            element.onkeydown = (event) => {

                if (!element.getAttribute("readonly")) {
                    return this.onKeyDown(element, event);
                }

                return true;
            };

            element.onpaste = (event) => {
                if (!element.getAttribute("readonly")) {
                    return this.onPaste(element, event, null);
                }
                return true;
            };

            if (options.placeHolder) {
                element.setAttribute("placeholder", options.placeHolder);
            }

            if (element.value.length > 0 && this.hasMask) {
                this.formatWithMask(element);
            }
        });
        document.documentElement.scrollTop = 0;
    }
}
const input = InputMask;
export default input;
