const mongoose = require('mongoose')
const citySchema = mongoose.Schema({
    id: {
        type:  Number,
        require: true
    },
    city_name:{
        type: String,
        require: true

    }
})
const city = mongoose.model('city', citySchema)
module.exports = city