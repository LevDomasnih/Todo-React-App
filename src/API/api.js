import * as axios from "axios";

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
    addTODO(todo) {
        return instance.post('post.php', todo)
            .then(response => response.data)
    },
    updateTODO(todo) {
        return instance.post('update.php', todo)
            .then(response => response.data)
    },
    deleteTODO(id) {
        return instance.post('delete.php', { id })
            .then(response => response.data)
    },
};