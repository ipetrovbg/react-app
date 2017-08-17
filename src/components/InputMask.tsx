import * as React from 'react';
interface StateProps {
    mask: string;
    onChange: (e: any) => void;
    value: string;
}
interface InputMaskState {
    // value: string;
}
export class InputMask extends React.Component<StateProps, InputMaskState> {
    formatCharacters: string[] = ["-", "_", "(", ")", "[", "]", ":", ".", ",", "$", "%", "@", " ", "/"];
    selectionStart: number;
    constructor() {
        super();
    }
    render() {
        // const { value } = this.state;
        const { value } = this.props;
        return (
            <input type="text" value={value}
                   onInput={(e: any) => {
                       this.interceptChange(e.target);
                   }} />
        );
    }
    private interceptChange(target) {
        const { onChange, mask } = this.props;
        const { selectionStart , selectionEnd, value } = target;
        target.setAttribute('placeholder', mask);
        const restrict = /[^0-9]/gi;
        let newValue = value.replace(restrict, '').substr(0, 14);
        const char = mask[selectionStart - 1];
        console.log(this.selectionStart);
        console.log(selectionStart);
        newValue = newValue.slice(0, selectionStart) + char + newValue.slice(selectionStart);
        this.selectionStart = selectionStart;


        onChange(newValue);
    }
}
