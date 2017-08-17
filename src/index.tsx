import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { Store, Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TodoListComponent } from './components/TodoList.component';
import { AppState } from "./actions/actions";
import { App } from './components/App';
import { rootReducer } from './reducers/root-reducer';

import '../assets/styles/main.css';
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8000/graphql'
});
const client = new ApolloClient({networkInterface});

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
const apoloMiddleware = client.middleware();

let store: Store<AppState> = createStore(
    combineReducers(
        {
            root: rootReducer,
            router: routerReducer,
            apollo: client.reducer(),
        }
    ),
    composeWithDevTools(applyMiddleware(thunk, middleware))
);

injectTapEventPlugin();

ReactDOM.render(
    <ApolloProvider store={store} client={client}>
        <MuiThemeProvider>        
            <ConnectedRouter history={history}>
                <div>
                    <Route exact path="/" component={App} />
                    <Route exact path="/todo" component={TodoListComponent} />
                </div>
            </ConnectedRouter>
        </MuiThemeProvider>
    </ApolloProvider>,
    document.getElementById("react-app")
);