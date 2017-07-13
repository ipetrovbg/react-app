import * as React from 'react';
import { Store } from 'react-redux';
import { addTodo, AppState, removeAllTodos } from '../actions/actions';
import { Link} from 'react-router-dom';
import { Observable } from 'rxjs/Observable';

export interface ITodoListComponent {
    store: Store<AppState>;
}

/**
 * TodoListComponent
 */
export class TodoListComponent extends React.Component<ITodoListComponent> {

    /**
     * just for autocomplete
     */
    public props: ITodoListComponent;
    public counter: number = 15;
    public state: any;
    public unsubscribe: Function;

    constructor(props: ITodoListComponent) {
        super();
        this.props = props;
        this.addTodo = this.addTodo.bind(this);
        this.renderCounter = this.renderCounter.bind(this);
        this.onChange = this.onChange.bind(this);
        this.resetTodos = this.resetTodos.bind(this);
        this.handleState = this.handleState.bind(this);
        this.state = {
            value: '',
            counter: null,
            todos: []
        };
    }

    /**
     * handling click event
     * @param {any} todo
     */
    public static handleClick(todo: any) {
        console.log(todo);
    }

    /**
     * rendering todos
     * @returns {[any,any,any,any,any]}
     */
    public renderTodoList() {
        return this.state
            .todos
            .map((todo: any, index: number) => {
                if (todo) {
                    return <h1 key={index} onClick={TodoListComponent.handleClick.bind(this, todo)}>{ todo.text }</h1>;
                }
            });
    }
    handleState() {
        this.setState({ todos: this.props.store.getState().todos });
    }
    componentWillMount() {
        const five = Observable.of(5);
        five.subscribe((myNumber => {
            console.log(myNumber);
        }))
    }

    /**
     * React lifecycle
     */
    componentDidMount() {
        this.handleState();
        this.unsubscribe = this.props.store.subscribe(this.handleState);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    addTodo() {
        if (!this.state.value)
            return;

        this.props.store.dispatch(addTodo(this.state.value));
        this.setState({value: '' });
    }
    renderCounter() {
        return <span>0</span>;
    }
    resetTodos() {
        this.props.store.dispatch(removeAllTodos());
    }
    onChange(e: any) {
        this.setState({value: e.target.value });
    }

    /**
     * react render function
     * @returns {any}
     */
    render() {
        return <div>
            <Link to="/">Home</Link>
            <input type="text" value={this.state.value} onChange={this.onChange} />&nbsp;
            <button onClick={ this.addTodo }>Add Todo</button> &nbsp;| &nbsp;
            <button onClick={ this.resetTodos }>Reset Todo's </button>
            <div>{ this.renderTodoList() }</div>
        </div>
    }
}
