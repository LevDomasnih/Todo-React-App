import {todoAPI} from "../API/api";
import {todoType} from "../types/types";
import {AppStateType} from "./reduxStore";
import {ThunkAction} from "redux-thunk";

const GET_TODO = 'GET_TODO';
const CHANGE_VISIBLE = 'CHANGE_VISIBLE';

type todoReducerStateType = {
    todo: Array<todoType>,
    drawerVisible: boolean
}

let initialState: todoReducerStateType = {
    todo: [],
    drawerVisible: false
}

const todoReducer = (state = initialState, action: ActionsTypes): todoReducerStateType => {
    switch (action.type) {
        case GET_TODO:
            return {
                ...state,
                todo: action.data,
            };
        case CHANGE_VISIBLE:
            return {
                ...state,
                drawerVisible: action.data,
            };
        default:
            return state;
    }
}

export default todoReducer;

type ActionsTypes = changeVisibleType | setTODODataType

type changeVisibleType = {
    type: typeof CHANGE_VISIBLE
    data: boolean
}

export const changeVisible = (data: boolean): changeVisibleType => ({type: CHANGE_VISIBLE, data});

type setTODODataType = {
    type: typeof GET_TODO
    data: Array<todoType>
}

export const setTODOData = (data: Array<todoType>): setTODODataType => ({type: GET_TODO, data});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getTODO = (): ThunkType => (dispatch, getState) => {
    todoAPI.getTODO()
        .then((data: Array<todoType>) => {
            dispatch(setTODOData(data));
        })
}

export const addTODO = (todo: todoType): ThunkType => (dispatch) => {
    todoAPI.addTODO(todo)
        .then(() => {
            dispatch(getTODO());
        })
}

export const updateTODO = (book: todoType): ThunkType => (dispatch) => {
    todoAPI.updateTODO(book)
        .then(() => {
            dispatch(getTODO());
        })
}

export const getTestData = (): ThunkType => (dispatch) => {
    todoAPI.getTestData()
}

export const deleteTODO = (id: number): ThunkType => (dispatch) => {
    todoAPI.deleteTODO(id)
        .then(() => {
            dispatch(getTODO());
        })
}