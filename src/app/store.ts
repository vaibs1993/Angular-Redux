import {ITodo} from './todo'
import { from } from "rxjs";
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS } from './actions';


//store is single js object which maintain app state.
//here we have interface IAppState where we define structure of our app state(where we maintain whole state of app).
export interface IAppState {
    todos: ITodo[];
    lastUpdate: Date;
}

// initial state of app should be set it to null.
export const INITIAL_STATE: IAppState = {
    todos: [],
    lastUpdate: null
}

//in redux it never mutate(change) the state it just create new copy of state for mainatining previous state.
// Reducer : js function which produce next state of application 
//reducer function which takes 2 parameter 
// 1. last state of app in store 
// 2. action to be performed 
// Object.assign() - its same like typescript spread operator '[...something]'
// use to copy object/array from source to dest without changing source array.
export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD_TODO:
            console.log(state);
            action.todo.id = state.todos.length + 1;  
            // the method Object.assihn() is used to combine multiple obj 
            //and for clone/copy object from exsting obj to new   
            return Object.assign({}, state, {
                todos: state.todos.concat(Object.assign({}, action.todo)),
                lastUpdate: new Date()
            })
        
        case TOGGLE_TODO:
            console.log(state);
            var todo = state.todos.find(t => t.id === action.id);
            var index = state.todos.indexOf(todo);
            return Object.assign({}, state, {
                todos: [
                    ...state.todos.slice(0, index),
                    Object.assign({}, todo, {isCompleted: !todo.isCompleted}),
                    ...state.todos.slice(index+1)
                ],
                lastUpdate: new Date()
            })
        case REMOVE_TODO:
            console.log(state);
            return Object.assign({}, state, {
                todos: state.todos.filter(t => t.id !== action.id),
                lastUpdate: new Date()
            })
        case REMOVE_ALL_TODOS:
            console.log(state);
            return Object.assign({}, state, {
                todos: [],
                lastUpdate: new Date()
            })
    }
    return state;
}