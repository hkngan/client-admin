const mongoose = require ('mongoose')
const orderSchema = mongoose.Schema({
    itemInfo:{
        name:{
            type: String,
            require: [true, 'movie name is required']
        },
        price:{
            type: Number,
            require: [true, 'price is required']
        },
        img:{
            type: String,
            require: [true, 'image is required']
        },
        seat:{
            type: [String],
            require: [true, 'quantity is required']
        },
        
        movie:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'nowplaying',
            require: true
        }
    },
    combo: {
        name: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        },
        img: {
            type: String
        }
    },
    theater:{
        type: String,
        require: [true, 'theater is required']
    },
    room:{
        type: [String],
        require:[true, 'room is required']
    },
    time:{
        type: String,
        require: [true, 'time is required']
    },
    date_start:{
        type: String,
        require: [true, 'date_start is required']
    },
    totalAmount:{
        type: Number,
        require:[true, 'total amount is required']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }
    
},
{timestamp: true}
)
const order = mongoose.model('order', orderSchema)
module.exports = order