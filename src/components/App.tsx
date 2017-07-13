import * as React from "react";
import {Link} from 'react-router-dom';

export interface IAppComponent { compiler: string; framework: string; }

export class App extends React.Component<IAppComponent> {
    props: IAppComponent;
    constructor(props: IAppComponent) {
        super();
        this.props = props;
    }
    public render() {
        return <div>
            <p><Link to="/todo">Todo List</Link></p>
            <h1>Hello from { this.props.framework }!</h1>
        </div>;

    }
}