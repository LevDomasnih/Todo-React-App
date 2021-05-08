import axios from "axios";
import {todoType} from "../types/types";

const spring = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    headers: {
        'Content-Type': 'application/json'
    },
});

export const todoAPI = {
    getTODO() {
        return spring.get('/get')
            .then(response => response.data)
    },
    addTODO(todo: todoType) {
        return spring.post('/add', todo)
            .then(response => response.data)
    },
    updateTODO(todo: todoType) {
        return spring.post('/update', todo)
            .then(response => response.data)
    },
    deleteTODO(id: number) {
        return spring.post('/delete', id)
            .then(response => response.data)
    },
};