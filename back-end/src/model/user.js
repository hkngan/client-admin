const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    verificationToken: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    },


})

const user = mongoose.model('user', userSchema)
module.exports = user