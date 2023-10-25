const mongoose = require('mongoose');

const showtimeSchema = mongoose.Schema({
    movie_name: [{
        type: String,
        require: true
    }],
    theater_name: [{
        type: String,
        require: true
    }],
    room_name: [{
        type: String,
        require: true
    }],
    day: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    cost: [{
        type: Number,
        require: true
    }]
});

const showtime = mongoose.model('showtime', showtimeSchema);

module.exports = showtime;
