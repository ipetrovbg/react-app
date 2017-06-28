import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps> {
    props: HelloProps;
    render() {
        return <h1>Hello from { this.props.framework } with {this.props.compiler}!</h1>;
    }
}