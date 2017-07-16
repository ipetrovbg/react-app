import * as React from "react";
import {Link} from 'react-router-dom';
import { Paper } from "material-ui";
import { Navigation } from "./Navigation";

export interface IAppComponent { compiler: string; framework: string; }

export class App extends React.Component<IAppComponent> {
    props: IAppComponent;
    constructor(props: IAppComponent) {
        super();
        this.props = props;
    }
    public render() {
        return <div>
            <Navigation/>
            <Paper>
                <h1>Hello from { this.props.framework }!</h1>
            </Paper>
        </div>;

    }
}