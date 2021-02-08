// -------------------------------
/******   IMPORT MODULES   ******/
const express = require('express');
const routes = new express.Router();
const multer = require('multer');

// controllers
const RoomController = require("./controllers/RoomController");
const RoomUserController = require("./controllers/RoomUserController");
const MessageRoomController = require("./controllers/MessageRoomController");

// MiddleWares
const Upload = multer();
const AuthToken = require('./middlewares/AuthToken');
const RoomMiddleWare = require('./middlewares/RoomMiddleware');
const RoomUserMiddleWare = require('./middlewares/RoomUserMiddleware');
const MessageRoomMiddleWare = require('./middlewares/MessageRoomMiddleware');


// Models
const Room = require('./models/RoomModel');
const RoomUser = require('./models/RoomUserModel');
const MessageRoom = require('./models/MessageRoomModel');

// Relations
// Room.hasMany(RoomUser, { foreignKey: 'idRoom' } );
// RoomUser.belongsTo(Room, { foreignKey: 'idRoom' } );

// Room.hasMany(MessageRoom, { foreignKey: 'idRoom' } );
// MessageRoom.belongsTo(Room, { foreignKey: 'idRoom' } );

// User.hasMany(Post, {foreignKey: 'idUser'});
// Post.belongsTo(User, {foreignKey: 'idUser'});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@room-chat-cluster.hbftd.mongodb.net/room-chat?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// Rota Principal
routes.get("/", (req, res) =>  res.send("Room-Chat - API"));

// rota padrao
routes.get('/ws/room/:id', async (req, res) => {
    var result = await Room.findOne({ _id: req.params.id });
    res.render('index.html', { room: result } );
});

// list rooms
routes.get('/room/list', async (req, res) => {
    var result = await Room.find();
    res.render('rooms.html', { rooms: result } );
});

/****************************/
//
//      SERVICES ROOM
//
/****************************/
routes.post("/room/save",     [ RoomMiddleWare.ValidateFields, RoomMiddleWare.save ],         RoomController.save);
routes.post("/room/update",   [ RoomMiddleWare.ValidateFields, RoomMiddleWare.update ],       RoomController.update);
routes.post("/room/list",     [ RoomMiddleWare.ValidateFields, RoomMiddleWare.list ],         RoomController.list);
routes.post("/room/list/:id", [ RoomMiddleWare.ValidateFields, RoomMiddleWare.listOne ],      RoomController.listOne);
routes.post("/room/delete",   [ RoomMiddleWare.ValidateFields, RoomMiddleWare.delete ],       RoomController.delete);


/****************************/
//
//      SERVICES ROOMUSER
//
/****************************/
routes.post("/roomuser/save",     [ RoomUserMiddleWare.ValidateFields, RoomUserMiddleWare.save ],         RoomUserController.save);
routes.post("/roomuser/update",   [ RoomUserMiddleWare.ValidateFields, RoomUserMiddleWare.update ],       RoomUserController.update);
routes.post("/roomuser/list",     [ RoomUserMiddleWare.ValidateFields, RoomUserMiddleWare.list ],         RoomUserController.list);
routes.post("/roomuser/list/:id", [ RoomUserMiddleWare.ValidateFields, RoomUserMiddleWare.listOne ],      RoomUserController.listOne);
routes.post("/roomuser/delete",   [ RoomUserMiddleWare.ValidateFields, RoomUserMiddleWare.delete ],       RoomUserController.delete);


/****************************/
//
//      SERVICES MESSAGEROOM
//
/****************************/
routes.post("/messageroom/save",     [ MessageRoomMiddleWare.ValidateFields, MessageRoomMiddleWare.save ],         MessageRoomController.save);
routes.post("/messageroom/update",   [ MessageRoomMiddleWare.ValidateFields, MessageRoomMiddleWare.update ],       MessageRoomController.update);
routes.post("/messageroom/list",     [ MessageRoomMiddleWare.ValidateFields, MessageRoomMiddleWare.list ],         MessageRoomController.list);
routes.post("/messageroom/list/:id", [ MessageRoomMiddleWare.ValidateFields, MessageRoomMiddleWare.listOne ],      MessageRoomController.listOne);
routes.post("/messageroom/delete",   [ MessageRoomMiddleWare.ValidateFields, MessageRoomMiddleWare.delete ],       MessageRoomController.delete);



module.exports = routes;