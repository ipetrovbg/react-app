import * as React from 'react';
import { Link} from 'react-router-dom';
import { bindActionCreators } from 'redux'

import RaisedButton from 'material-ui/RaisedButton';
import { gql, graphql, ChildProps } from 'react-apollo';

import { loadAsyncTodos, loadAsyncUser, removeAllTodos } from '../actions/actions';
import { connectify } from "../decorators/connectify";
import { Navigation } from "./Navigation";
import { DatePicker, Divider, Paper } from "material-ui";
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import './todo-list-component.css';
import { FontIcon } from "material-ui/FontIcon";
import { User } from "../models/User";

export interface ITodoListComponent {
    todos: any[];
    data: any;
    toggleMenuState: boolean;
    removeAllTodos: () => void;
    loadAsyncTodos: () => void;
    loadAsyncUser: () => void;
}

/**
 * TodoListComponent
 */
const query = gql`
  {
  users {
    name
  }
}
`;


@connectify((store) => {
    return {
        todos: store.root.todos,
        toggleMenuState: store.root.toggleMenuState
    }
}, (dispatch) => {
    return {
        removeAllTodos: bindActionCreators(removeAllTodos, dispatch),
        loadAsyncTodos: bindActionCreators(loadAsyncTodos, dispatch),
        loadAsyncUser: bindActionCreators(loadAsyncUser, dispatch),
    }
})
export class TodoListComponent extends React.Component<any, any> {
    props: any;
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
        };
    }
    // handleTodos() {
    //    return this.props.todos.map((todo: any, index: number) => {
    //     return <div  key={index} style={{float: 'left', width: 165, overflow: 'hidden', height: 165}}>
    //         <img src={todo.thumbnailUrl} alt={todo.title} />
    //     </div>
    //    });
    // }

    resetTodos() {
        this.props.removeAllTodos();
    }
//     loadAsyncTodos() {
//         this.props.loadAsyncTodos();
//         let q = gql`
//   {
//   users {
//     name,
//     email,
//     news {
//         title
//         content
//         author{
//             email
//         }
//     }
//   }
// }
// `;
//         this.props.data.fetchMore({
//             query: q,
//             updateQuery: (previousResult: any, { fetchMoreResult, queryVariables }) => {
//                 const fm: any = fetchMoreResult;
//                 return {
//                     ...previousResult,
//                     // Add the new feed data to the end of the old feed data.
//                     feed: [...previousResult.users, ...fm.users],
//                 };
//             },
//         }).then((data: any) => data.data.users)
//             .then((users: User[]) => {
//                 console.log(users[0].news[0].author.email);
//             })
//     }
    select = (index) => this.setState({selectedIndex: index});
    /**
     * react render function
     * @returns {any}
     */
    render() {
        return <div>
                <Navigation/>
                <div className="spacer-top spacer-bottom spacer-left spacer-right">
                    <Paper className="" style={
                        {
                            marginLeft: this.props.toggleMenuState ? 260 : 0,
                        }
                    }>
                        <DatePicker
                            hideCalendarDate={false}
                            autoOk={true}
                            hintText="Controlled Date Input"
                        />
                        {/*<RaisedButton primary={true} label="Images" onClick={this.loadAsyncTodos.bind(this)} />*/}
                        <RaisedButton label="Reset" secondary={true} onClick={this.resetTodos.bind(this)} />
                        <Divider/>
                        {/*{this.handleTodos()}*/}
                        <div style={{clear: 'both'}} />
                    </Paper>
                </div>
            </div>
    }
}
// export const TodoListComponent = graphql<any, any>(query, {
//     options: { fetchPolicy: 'cache-and-network' },
// })(TodoList);
