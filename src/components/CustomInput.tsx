import * as React from 'react';
import InputMask, { InputMaskDefaultMask } from "../masked";


export class CustomInput extends React.Component<any, any> {
    private ref: any;
    render() {
        const mask = new InputMask().initialize(this.ref,
            {
                mask: InputMaskDefaultMask.Phone,
                placeHolder: "Phone: (999) 999-9999"
            });

        return <input type="text" ref={(ref) => this.ref = ref} />
    }
}