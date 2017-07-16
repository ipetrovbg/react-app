import * as React from 'react';

import { connectify } from "../decorators/connectify";
import { AppBar, Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui";
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from "react-router-dom";

/**
 * TodoListComponent
 */
@connectify((store) => {
    return {
        todos: store.todos
    }
})
export class Navigation extends React.Component<any, any> {
    state: {open: boolean};
    constructor(props: any) {
        super();
        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});
    render() {
        return <div>
            <AppBar showMenuIconButton={true} onLeftIconButtonTouchTap={this.handleToggle.bind(this)}></AppBar>
            <Drawer docked={false} onRequestChange={this.handleToggle.bind(this)} open={this.state.open}>
                <AppBar onLeftIconButtonTouchTap={this.handleToggle.bind(this)} title="Menu" />
                <MenuItem containerElement={<Link to="/" />}>Home</MenuItem>
                <MenuItem containerElement={<Link to="/todo" />}>Todo</MenuItem>
            </Drawer>
        </div>
    }
}
