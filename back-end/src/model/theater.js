const mongoose = require('mongoose')
const theaterSchema = new mongoose.Schema({
    id_city:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities',
        require: true
    },
    theater_name:{
        type: String,
        require: true 
    },

})
const theater = mongoose.model("theater", theaterSchema)
module.exports = theater