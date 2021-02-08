const MessageRoom = require('../models/MessageRoomModel');

module.exports = async (socket) => {

    // id de quem conectou
    console.log('socket conectado: ' + socket.id)

    // token vindo do front end
    console.log(socket.handshake.headers.authorization)

    // escuta o evento sendMessage ( recebe os dados )
    socket.on('sendMessage', async data => {
        await MessageRoom.create( data ).then( async result => {
            // envia o evento receivedMEssage para todos os sockets
            socket.broadcast.emit('receivedMessage', data);
        });
    })


    // envia o array completo de mensagens ao evento previousMessage
    var result = await MessageRoom.find({ idRoom: socket.handshake.headers.idroom });
    socket.emit('previousMessage', result);

    
}