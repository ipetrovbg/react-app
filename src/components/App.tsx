import * as React from "react";
import {Link} from 'react-router-dom';
import { Paper } from "material-ui";
import { Navigation } from "./Navigation";
import { connectify } from "../decorators/connectify";
import { InputMask } from "./InputMask";


export interface IAppComponent {
    toggleMenuState: boolean;
}
@connectify((store) => {
    return {
        toggleMenuState: store.root.toggleMenuState
    }
})
export class App extends React.Component<any, {value: string}> {
    props: any;
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    public render() {
        const { value } = this.state;
        return <div>
            <Navigation/>
            <div className="spacer-top spacer-bottom spacer-left spacer-right">
                <Paper style={
                    {
                        marginLeft: this.props.toggleMenuState ? 260 : 0,
                    }
                }>
                    <InputMask mask="(999) 999-9999" value={value} onChange={(e) => this.setState({value: e})}/>
                </Paper>
            </div>
        </div>;

    }
}