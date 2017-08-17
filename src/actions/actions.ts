import { actionTypes } from './action.types';
import { Action } from 'redux';
import axios from 'axios';
export interface AppState {
    counter: number;
    todos: Array<any>;
    toggleMenuState: boolean;
}

export const AppStore: AppState = {
    counter: 0,
    todos: [],
    toggleMenuState: false
};

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
export const loadTodos: (payload: any) => TodoAction = (payload: any) => ({
    type: actionTypes.LOAD_TODOS,
    payload
});

export const toggleMenu: () => TodoAction = () => ({
    type: actionTypes.TOGGLE_MENU
});

export const loadUser: (payload: any) => TodoAction = (payload: any) => ({
    type: actionTypes.LOAD_USER,
    payload
});
export const loadAsyncUser = () => (dispatch) => {
    Promise.resolve(axios.get('http://localhost:8000/api/user'))
        .then((result: any) => result.data)
        .then((result: any) => {
        console.log(result);
            dispatch(loadUser(result));
        })
};
export const loadAsyncTodos = () => (dispatch) => {
    if (CachedTodos.todos.length) {
        dispatch(loadTodos(CachedTodos.todos));
    } else {
        Promise.resolve(axios.get('http://jsonplaceholder.typicode.com/albums/1/photos'))
            .then((response: any) => {
                CachedTodos.setTodos(response.data);
                dispatch(loadTodos(response.data));
            })
    }
};
export class CachedTodos {
    public static todos = [];
    public static setTodos(todos) {
        this.todos = todos;
    }
}