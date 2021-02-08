const mongoose = require('mongoose');

const RoomShema = new mongoose.Schema({
    Title: String,
    Type: Number
},{
    timestamps: true,
});

module.exports = mongoose.model('Room', RoomShema);