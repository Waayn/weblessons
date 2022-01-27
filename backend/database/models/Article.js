import mongoose from "mongoose";

export default class Article {
    constructor(uri) {
        this.uri = uri
    }

    async connect() {
        await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
        this.articleSchema = new mongoose.Schema({
            title: String,
            content: String,
            questions: Array
        })
    }

    async createArticle(article) {
        const Articles = mongoose.model('articles', this.articleSchema)
        return new Promise(async (resolve, reject) => {
            const newArticle = new Articles(article)
            try {
                await newArticle.save()

                resolve({ success: `Article ${article.title} created` })
            } catch (err) {
                console.log(err)
                reject({ error: "Invalid data or database connection error" })
            }
        })
    }

    async getArticleById(articleId) {
        const Articles = mongoose.model('articles', this.articleSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const article = await Articles.findById(articleId)
                resolve(article)
            } catch (err) {
                reject({ error: "Invalid id or database connection error" })
            }
        })
    }

    async getArticles() {
        const Articles = mongoose.model('articles', this.articleSchema)
        return new Promise(async (resolve, reject) => {
            try {
                const articles = await Articles.find()
                resolve(articles)
            } catch (err) {
                reject({ error: "Invalid id or database connection error" })
            }
        })
    }
}