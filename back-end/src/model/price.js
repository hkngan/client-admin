const mongoose = require('mongoose')

const priceSchema = mongoose.Schema({
    cost:{
        type: Number,
        require: true
    }
})
const prices = mongoose.model('prices', priceSchema)
module.exports = prices