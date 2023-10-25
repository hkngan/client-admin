const mongoose = require('mongoose')

const roomsSchema = mongoose.Schema({
    room_name:{
        type: String,
        require: true
    }
})

const rooms = mongoose.model('Rooms', roomsSchema)
module.exports = rooms