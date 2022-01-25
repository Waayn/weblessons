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