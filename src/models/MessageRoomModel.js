const mongoose = require('mongoose');

const MessageRoomShema = new mongoose.Schema({
    idRoom: String,
    idUser: String,
    Text: String,
    Type: Number
},{
    timestamps: true,
});

module.exports = mongoose.model('MessageRoom', MessageRoomShema);
