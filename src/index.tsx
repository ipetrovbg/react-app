import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Store, Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import { TodoListComponent } from './components/TodoList.component';
import { AppState } from "./actions/actions";
import { App } from './components/App';
import { rootReducer } from './reducers/root-reducer';

let store: Store<AppState> = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <App compiler={'TypeScript'} framework={'React'} />
                </Route>
                <Route exact path="/todo">
                    <TodoListComponent />
                </Route>
            </Switch>
        </Router>
    </Provider>
        ,
    document.getElementById("react-app")
);