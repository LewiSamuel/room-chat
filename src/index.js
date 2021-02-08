// import modules
const path = require('path');
const express = require('express');
const formidableMiddleware = require('express-formidable');
const cors = require('cors');
// Implementa o arquivo .env
require("dotenv/config");
const routes = require('./routes');
const socketController = require("./controllers/socketController");

// Importa e inicializa o servidor express
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// diretorio com arquivos estaticos ( front - end )
app.use(express.static(path.join(__dirname, '..', 'public')));
// congigura onde estão as views 
app.set('views', path.join(__dirname, '..', 'public'));
// engine HTML / ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Captura informações passadas via FormData
app.use(formidableMiddleware());

// FAVICON 
app.use('/favicon.ico', express.static('public/favicon.ico'));

// Habilita a todas rotas receber requisições de todas as origens 
app.use(cors());

// Implementa toda comunicação recebida em JSON
app.use(express.json());

io.of("/websocket").on('connection', socketController);

// # STATIC ROUTES 

// importa e implementa o arquivo de rotas no servidor
app.use(routes);

// set porta padrão de execução do servidor
// Caso nao esteja definida no .env, usa a 5000 por padrão
app.set('port', (process.env.PORT || 5000));

// server.listen(app.get('port'))
// Start server
server.listen(app.get('port'), function() {
    console.log("* - ** - ** - ** - ** - ** - ** - ** - ** - ** - ** - ** - *")
    console.log("| ");
    console.log('|  room-chat - API at http://localhost:' + app.get('port'));
    console.log("| ");
    console.log("* - ** - ** - ** - ** - ** - ** - ** - ** - ** - ** - ** - *")
});