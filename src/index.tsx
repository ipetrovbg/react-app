import * as React from "react";
import * as ReactDOM from "react-dom";
import "rxjs";
import { createStore } from 'redux';
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

let store: Store<AppState> = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <App compiler={'TypeScript'} framework={'React'} />
                </Route>
                <Route exact path="/todo">
                    <TodoListComponent store={store} />
                </Route>
            </Switch>
        </Router>
    </Provider>
        ,
    document.getElementById("react-app")
);