import mongoose from "mongoose";


export default class Pokemon {
    constructor(uri) {
        this.uri = uri;
    }

    async connect() {
        await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true })
        this.pokemonSchema = new mongoose.Schema({
            id: Number,
            name: Object,
            type: Array,
            base: Object,
            species: String,
            description: String,
            evolution: Object,
            profile: Object,
            image: Object,
            sprite: String,
            thumbnail: String,
            hires: String
        })
        this.Pokemons = mongoose.model('pokemons', this.pokemonSchema)
    }

    async getAllPokemons() {
        return new Promise(async (resolve, reject) => {
            try {
                const datas = await this.Pokemons.find()
                resolve(datas)
            } catch (err) {
                reject(err)
            }
        })
    }

    async getPokemonById(pokemonId) {
        return new Promise(async (resolve, reject) => {
            try {
                const datas = await this.Pokemons.find({ id: parseInt(pokemonId) })
                resolve(datas)
            } catch (err) {
                reject(err)
            }
        })
    }
}