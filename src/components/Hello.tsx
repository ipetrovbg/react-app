import * as React from "react";
import {Link, RouteComponentProps} from 'react-router-dom';

export interface HelloProps extends RouteComponentProps<any> { compiler?: string; framework?: string; }

export class Hello extends React.Component<HelloProps, {}> {
    public render() {
        return <h1><Link to="/todo">Todo List</Link>Hello from Hello Component!</h1>;
    }
}