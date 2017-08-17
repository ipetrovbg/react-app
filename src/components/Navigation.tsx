import * as React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import { connectify } from "../decorators/connectify";
import { bindActionCreators } from 'redux'
import { AppBar, List, ListItem, Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui";
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from "react-router-dom";
import DatePicker from 'material-ui/DatePicker';
import { toggleMenu } from "../actions/actions";
import { ContentInbox, ContentSend } from "material-ui/svg-icons";

interface INavigation {
    toggleMenu: (payload: any) => boolean;
    toggleMenuState: boolean;
}

/**
 * TodoListComponent
 */
@connectify((store) => {
    return {
        toggleMenuState: store.root.toggleMenuState
    }
}, (dispatch) => {
    return {
        toggleMenu: bindActionCreators(toggleMenu, dispatch),
    }
})
export class Navigation extends React.Component<any, any> {
    state: { open: boolean };
    constructor () {
        super();
        this.state = {
            open: false
        };
    }

    handleToggle = () => {
        this.props['toggleMenu']();
    };

    render () {
        return <div>
            <AppBar showMenuIconButton={true} onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
            <Drawer docked={true} onRequestChange={this.handleToggle.bind(this)} open={this.props['toggleMenuState']}>
                <AppBar onLeftIconButtonTouchTap={this.handleToggle.bind(this)} title="Menu"/>
                <List>
                    <ListItem leftIcon={<ContentInbox />}
                              primaryTogglesNestedList={true}
                              primaryText="Inbox"
                              nestedItems={[
                              <ListItem key={1}
                                        leftIcon={<ContentSend />}
                                        primaryText="Starred"
                                        primaryTogglesNestedList={true}
                                        nestedItems={[
                                            <ListItem key={3}
                                                      leftIcon={<ContentSend />}
                                                      primaryText="Sent mail"/>
                                        ]}/>,
                                <ListItem
                                    key={2}
                                    primaryText="Sent Mail"
                                    leftIcon={<ContentSend />} />
                    ]}>
                    </ListItem>

                    <ListItem primaryText="Home" containerElement={<Link to="/">Home</Link>} />
                    <ListItem primaryText="Todo" containerElement={<Link to="/todo">Todo</Link>} />
                </List>
            </Drawer>
        </div>
    }
}
