import axios from "axios";
import {todoType} from "../types/types";

const spring = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     'Content-Type': "text/html; charset=UTF-8"
    // },
});

const instance = axios.create({
    baseURL: 'https://todo',
    headers: {
        'Content-Type': "text/html; charset=UTF-8"
    },
});

export const todoAPI = {
    getTODO() {
        return instance.get('get.php')
            .then(response => response.data)
    },
    addTODO(todo: todoType) {
        return instance.post('post.php', todo)
            .then(response => response.data)
    },
    updateTODO(todo: todoType) {
        return instance.post('update.php', todo)
            .then(response => response.data)
    },
    deleteTODO(id: number) {
        return instance.post('delete.php', { id })
            .then(response => response.data)
    },
    getTestData() {
        spring.get('/')
            .then(resp => console.log(resp.data))
    }
};