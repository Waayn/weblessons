import axios from 'axios';

export const login = (infos) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post('http://localhost:1510/login', { ...infos })
                .then(res => resolve(res))
                .catch(err => reject(err))
        } catch (err) {
            reject({ error: "Impossible d'accéder au serveur" })
        }
    })
}

export const createUser = (infos) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post('http://localhost:1510/create/user', { ...infos })
                .then(res => resolve(res))
                .catch(err => reject(err))
        } catch (err) {
            reject({ error: "Impossible d'accéder au serveur" })
        }
    })
}

export const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post('http://localhost:1510/get/user', { id })
                .then(res => resolve(res))
                .catch(err => reject(err))
        } catch (err) {
            reject({ error: "Impossible d'accéder au serveur" })
        }
    })
}

export const createArticle = (article) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post('http://localhost:1510/create/article', { ...article })
                .then(res => resolve(res))
                .catch(err => reject(err))
        } catch (err) {
            reject({ error: "Impossible d'accéder au serveur" })
        }
    })
}

export const getAllArticles = () => {
    return new Promise((resolve, reject) => {
        try {
            axios.get('http://localhost:1510/articles')
                .then(res => resolve(res))
                .catch(err => reject(err))
        } catch (err) {
            reject({ error: "Impossible d'accéder au serveur" })
        }
    })
}

export const getArticleById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post('http://localhost:1510/get/article', { id })
                .then(res => resolve(res))
                .catch(err => reject(err))
        } catch (err) {
            reject({ error: "Impossible d'accéder au serveur" })
        }
    })
}