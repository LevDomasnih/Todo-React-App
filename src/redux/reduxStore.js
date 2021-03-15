import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers } from "redux";
import todoReducer from "./todoReducer";


let reducers = combineReducers({
    todoStore: todoReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;