const mongoose = require('mongoose')

const comboSchema = mongoose.Schema({
    combo_id:{
        type: String,
        require: true
    },
    combo_name:{
        type: String,
        require: true
    },
    des:{
        type: String,
        require: true
    },
    img:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    }
})
const combo = mongoose.model('combo', comboSchema)
module.exports = combo