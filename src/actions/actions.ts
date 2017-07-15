import { actionTypes } from './action.types';
import { Action } from 'redux';
import axios from 'axios';
export interface AppState {
    counter: number;
    todos: Array<any>
}

export const AppStore: AppState = {
    counter: 0,
    todos: []
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

export const loadAsyncTodos = () => (dispatch) => {
    if (CachedTodos.todos.length) {
        dispatch(loadTodos(CachedTodos.todos));
    } else {
        axios.get('http://jsonplaceholder.typicode.com/albums/1/photos')
            .then((response) => {
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