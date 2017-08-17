import { AppState, AppStore, TodoAction } from '../actions/actions';
import { actionTypes } from '../actions/action.types';

export const rootReducer = (state: AppState = AppStore, action: TodoAction) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            state.counter = state.counter + action.payload;
            return Object.assign({}, state);
        case actionTypes.DECREMENT:
            state.counter = state.counter - 5;
            return Object.assign({}, state);
        case actionTypes.ADD_TODO:
            return Object.assign({}, state, { todos: [].concat(state.todos, { title: action.payload }) });
        case actionTypes.RESET_TODOS:
            state.todos = [];
            return Object.assign({}, state);
        case actionTypes.TOGGLE_MENU :
            state.toggleMenuState = !state.toggleMenuState;
            return Object.assign({}, state);
        case actionTypes.LOAD_TODOS:
            state.todos = action.payload;
            return Object.assign({}, state);
        default:
            return state
    }
};