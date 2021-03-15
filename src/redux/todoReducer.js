import {todoAPI} from "../API/api";

const GET_TODO = 'GET_TODO';
const CHANGE_VISIBLE = 'CHANGE_VISIBLE';

let initialState = {
    todo: [

    ],
    drawerVisible: false
}

const todoReducer = (state = initialState, action) => {
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

export const changeVisible = (data) => ({ type: CHANGE_VISIBLE, data });

export const setTODOData = (data) => ({ type: GET_TODO, data });

export const getTODO = () => (dispatch) => {
    todoAPI.getTODO()
        .then((data) => {
            dispatch(setTODOData(data));
        })
}

export const addTODO = (todo) => (dispatch) => {
    todoAPI.addTODO(todo)
        .then(() => {
            dispatch(getTODO());
        })
}

export const updateTODO = (book) => (dispatch) => {
    todoAPI.updateTODO(book)
        .then(() => {
            dispatch(getTODO());
        })
}

export const deleteTODO = (id) => (dispatch) => {
    todoAPI.deleteTODO(id)
        .then(() => {
            dispatch(getTODO());
        })
}