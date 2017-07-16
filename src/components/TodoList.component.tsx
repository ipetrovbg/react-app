import * as React from 'react';
import { Link} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import { loadAsyncTodos, removeAllTodos } from '../actions/actions';
import { connectify } from "../decorators/connectify";
import { Navigation } from "./Navigation";
import { Paper } from "material-ui";

export interface ITodoListComponent {
    todos: Array<any>;
    dispatch: Function;
}

/**
 * TodoListComponent
 */
@connectify((store) => {
    return {
        todos: store.todos
    }
})
export class TodoListComponent extends React.Component<any, any> {

    handleTodos() {
       return this.props.todos.map((todo: any, index: number) => {
        return <div  key={index} style={{float: 'left', width: 165, overflow: 'hidden', height: 165}}>
            <img src={todo.thumbnailUrl} alt={todo.title} />
        </div>
       });
    }

    resetTodos() {
        this.props.dispatch(removeAllTodos());
    }
    loadAsyncTodos() {
        this.props.dispatch(loadAsyncTodos());
    }

    /**
     * react render function
     * @returns {any}
     */
    render() {
        return <Paper>
                <Navigation/>
                <RaisedButton label="Load Async Todos" onClick={this.loadAsyncTodos.bind(this)} />
                <RaisedButton label="Reset todos" onClick={this.resetTodos.bind(this)} />
                <Divider />
                {this.handleTodos()}
                <div style={{clear: 'both'}}></div>
            </Paper>
    }
}