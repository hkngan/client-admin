const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    verificationToken: String,

})
const adminAcc = mongoose.model('admin', adminSchema)
module.exports = adminAcc