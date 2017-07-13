import { actionTypes } from './action.types';
import { Action } from 'redux';

export const AppStore: AppState = {
    counter: 0,
    todos: []
}
export interface AppState {
    counter: number;
    todos: Array<any>
}

export interface TodoAction extends Action {
    payload?: any;
}

export const removeAllTodos = (): TodoAction => ({
    type: actionTypes.RESET_TODOS
});


export const addTodo = (payload: any): TodoAction => ({
    type: actionTypes.ADD_TODO,
    payload: payload
});

export const addCounter: (payload: number) => TodoAction = (payload: number) => ({
    type: actionTypes.INCREMENT,
    payload
});
