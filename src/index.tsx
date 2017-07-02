import * as React from "react";
import * as ReactDOM from "react-dom";
import { TodoListComponent } from './components/TodoList.component';
import { createStore } from 'redux';
import {Store} from "react-redux";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
} from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'

import {addCounter, AppState, AppStore, TodoAction} from "./actions/actions";
import {actionTypes} from "./actions/action.types";
import { Hello } from './components/Hello';





function counter(state: AppState = AppStore, action: TodoAction) {
    switch (action.type) {
        case actionTypes.INCREMENT:
            state.counter = state.counter + action.payload;
            return Object.assign({}, state);
        case actionTypes.DECREMENT:
            state.counter = state.counter - 5;
            return Object.assign({}, state);
        case actionTypes.ADD_TODO:
            state.todos.push({ text: action.payload });
            return Object.assign({}, state);
        case actionTypes.RESET_TODOS:
            state.todos = [];
            return Object.assign({}, state);
        default:
            return state
    }
}

let store: Store<AppState> = createStore(counter);

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.


setTimeout(() => {
    store.dispatch(addCounter(5));
}, 0);
const history = createHistory();
ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Hello as any} />
            <Route path="/todo">
                <TodoListComponent store={store} />
            </Route>
        </Switch>
    </Router>,
    document.getElementById("react-app")
);