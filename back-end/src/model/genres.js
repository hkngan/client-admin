const mongoose = require('mongoose')

const genreSchema = mongoose.Schema({
    id_genre:{
        type: Number,
        require: true
    },
    name:{
        type: String,
        require: true
    }
})
const genres = mongoose.model('genres', genreSchema)
module.exports = genres