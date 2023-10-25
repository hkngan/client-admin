const mongoose = require('mongoose')

const rateShema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },

})
const rate = mongoose.model('rate', rateShema)
module.exports = rate