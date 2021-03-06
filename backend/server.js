import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import Pokemon from "./database/models/Pokemon.js";
import User from "./database/models/User.js";
import Article from "./database/models/Article.js";

dotenv.config()
const PORT = process.env.PORT
const URI = process.env.DB_HOST
const SALT = process.env.SALT

const app = express()
// const pokemonDB = new Pokemon(URI)
// pokemonDB.connect()
const userDB = new User(URI, SALT)
const articleDB = new Article(URI)
userDB.connect()
articleDB.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.post('/create/user', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({ message: 'Error. Please enter a username, a email and a password' })
    }
    userDB.createUser({ username: req.body.username, password: req.body.password, email: req.body.email })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error }))
})

app.post('/create/article', (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.questions) {
        return res.status(400).json({ message: 'Error. Please enter a title, a content and the questions' })
    }
    articleDB.createArticle({ title: req.body.title, content: req.body.content, questions: req.body.questions })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error }))
})

app.post('/get/article', (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ message: 'Error. Please enter an id' })
    }
    articleDB.getArticleById(req.body.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

app.get('/articles', (req, res) => {
    articleDB.getArticles()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error }))
})

app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter a username and a password' })
    }
    userDB.login({ email: req.body.email, password: req.body.password })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

app.post('/get/user', (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({ message: 'Error. Please enter an id' })
    }
    userDB.getUserById(req.body.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

// app.get('/pokemons', (req, res) => {
//     pokemonDB.getAllPokemons()
//         .then(pokemons => res.status(200).json(pokemons))
//         .catch(error => res.status(500).json({ error }))
// })

// app.get('/pokemon/:pokemonId', (req, res) => {
//     pokemonDB.getPokemonById(req.params.pokemonId)
//         .then(pokemon => res.status(200).json(pokemon))
//         .catch(error => res.status(500).json({ error }))
// })