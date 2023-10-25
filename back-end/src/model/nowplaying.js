const mongoose = require('mongoose')
const movieSchema = mongoose.Schema({
    img:{
        type: String,
        require: true
    },
    id_movie: {
        type: String,
        require: true
    },
    movie_name:{
        type: String,
        require: true
    },
    des:{
        type: String,
        require: true
    },
    trailer:{
        type: String,
        require: true
    },
    start_date:{
        type: String,
        require: true
    },
    time:{
        type: Number,
        require: true
    },
    rate:[{
        type: String,
        require: true
    }],
    genres:[{
        type: String,
        require: true
    }]
})

const nowplaying = mongoose.model('nowplaying', movieSchema)
module.exports = nowplaying