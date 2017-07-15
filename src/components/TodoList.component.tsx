import * as React from 'react';
import { Store, connect } from 'react-redux';
import { addTodo, AppState, loadAsyncTodos, removeAllTodos } from '../actions/actions';
import { Link} from 'react-router-dom';
import { connectify } from "../decorators/connectify";

export interface ITodoListComponent {
    todos: Array<any>;
    counter: number;
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

    // constructor() {
    //     super();
    // //     this.addTodo = this.addTodo.bind(this);
    // //     this.renderCounter = this.renderCounter.bind(this);
    // //     this.onChange = this.onChange.bind(this);
    // //     this.resetTodos = this.resetTodos.bind(this);
    // //     // this.handleState = this.handleState.bind(this);
    // //     // this.state = {
    // //     //     value: '',
    // //     //     todos: []
    // //     // };
    // }

    /**
     * handling click event
     * @param {any} todo
     */
    public handleClick(todo: any) {
        console.log(todo);
        this.props.dispatch(addTodo(todo.title + ' new'));
    }



    handleTodos() {
       return this.props.todos.map((todo: any, index: number) => {
        return <div  key={index} style={{float: 'left', width: 165, overflow: 'hidden', height: 165}}>
            {/*<p onClick={this.handleClick.bind(this, todo)}>{ todo.title }</p>*/}
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
     * React lifecycle
     */
    // componentDidMount() {
    //     // this.handleState();
    //     // this.props.store.subscribe(this.handleState);
    // }

    // componentWillUnmount() {
    // }

    // addTodo() {
    //     // if (!this.state.value)
    //     //     return;
    //     //
    //     // this.props.store.dispatch(addTodo(this.state.value));
    //     // this.setState({value: '' });
    // }
    // renderCounter() {
    //     return <span>0</span>;
    // }
    // resetTodos() {
    //     // this.props.store.dispatch(removeAllTodos());
    // }
    // onChange(e: any) {
    //     this.setState({value: e.target.value });
    // }

    /**
     * react render function
     * @returns {any}
     */
    render() {
        return <div>
            <button onClick={this.loadAsyncTodos.bind(this)}>Load Async Todos</button>
            <button onClick={this.resetTodos.bind(this)}>Reset todos</button>
            <Link to="/" >Home</Link>
            <hr/>
            {this.handleTodos()}
            </div>
    }
}