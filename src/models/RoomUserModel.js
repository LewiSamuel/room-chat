const mongoose = require('mongoose');

const RoomUserShema = new mongoose.Schema({
    idRoom: Number,
    idUser: String,
    Type: Number
},{
    timestamps: true,
});

module.exports = mongoose.model('RoomUser', RoomUserShema);
