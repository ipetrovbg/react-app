import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Store, Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { TodoListComponent } from './components/TodoList.component';
import { AppState } from "./actions/actions";
import { App } from './components/App';
import { rootReducer } from './reducers/root-reducer';

import '../assets/styles/main.css';

let store: Store<AppState> = createStore(rootReducer, applyMiddleware(thunk));
injectTapEventPlugin();
ReactDOM.render(
    <Provider store={store}>
        <div>
            <MuiThemeProvider>
                <div>

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
                </div>
            </MuiThemeProvider>
        </div>

    </Provider>
        ,
    document.getElementById("react-app")
);