import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers } from "redux";
import todoReducer from "./todoReducer";


let rootReducer = combineReducers({
    todoStore: todoReducer,
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
window.store = store;

export default store;