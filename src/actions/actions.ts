import {actionTypes} from "./action.types";

export const AppStore: AppState = {
    counter: 0,
    todos: []
}
export interface AppState {
    counter: number;
    todos: Array<any>
}

export interface Action {
    type: any;
}

export interface TodoAction extends Action {
    type: any;
    payload?: any;
}

export const removeAllTodos = () => {
    return {
        type: actionTypes.RESET_TODOS
    };
};

export const addTodo: (payload: any) => TodoAction = (payload) => ({
    type: actionTypes.ADD_TODO,
    payload
});

export const addCounter: (payload: any) => TodoAction = (payload) => ({
    type: actionTypes.INCREMENT,
    payload
});

export const removeTodo = () => {
    return {
        type: actionTypes.DECREMENT
    };
};