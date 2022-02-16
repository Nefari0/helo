
require('dotenv').config();
const massive = require('massive')

const { SERVER_PORT,CONNECTION_STRING,SESSION_SECRET} = process.env

const express = require('express');
const userCtrl = require('./controllers/user');
const postCtrl = require('./controllers/posts');
const session = require('express-session');
const bcrypt = require('bcryptjs')
const messageController = require('./controllers/messageController')
// const webSocketServer = require('ws').server;
// const webSocket = require('websocket').server;


const app = express();

app.use(express.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 5 },
}))

// ---------------------------------------------- //
// -------testing websockets / ws--------------- //
const webSocketsServerPort = 9000;
// const webSocketsServerPort = 4005;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort, () => console.log(`sockets connected on ${webSocketsServerPort}`));
const wsServer = new webSocketServer({
  httpServer: server
});

// console.log('web socket server',wsServer)

const clients = {};

// // This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

// webSocket.WebSocketServer.on('request', function(request) {
    wsServer.on('request', function(request) {
        var userID = getUniqueID();
        console.log('user id',request.origin)
        // console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
        // You can rewrite this part of the code to accept only the requests from allowed origin
        const connection = request.accept(null, request.origin);
        clients[userID] = connection;
        // console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                // console.log('Recieved Message: ',message.utf8Data);
            }
            let iters = 0
            message["utf8Data"].unit = iters.toString()
            // console.log(message[])
            iters += 1
            for(key in clients) {
                // clients[key].sendUTF(message.utf8Data);
                
                clients[key].sendUTF(message.utf8Data);
                // console.log('hit for loop in clients',message.utf8Data)
                // console.log(iters,'sent Message to: ', key)
                iters = iters + 1
            }
            // console.log('here are your clients',clients[userID])
            // console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
        })

        });

// ---------------------------------------------- //
// --------------------------------------------- //


//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

// //Post Endpoints
// test end points http://localhost:4000/api/posts?mine=6&search=new
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.get('/api/messages/user/:user_id', messageController.getUserMessages)
app.post('/api/messages/user/add', messageController.createMessage)
app.post('/api/messages/user/delete',messageController.deleteMessage)

// site messaging system endpoints
app.get('/api/conversations/:user_id',messageController.getConversationByUserId) // gets all user conversations
app.get('/api/conversation/messages/get/:conversation_id',messageController.getConversationMessagesById) // get all user messages in user's conversations
app.post('/api/conversation/new',messageController.createNewConversation)
app.post('/api/conversation/user/new', messageController.sendMessage)
app.post('/api/conversation/exists',messageController.checkExisting)

massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized : false,
    },
}).then((dbInstance) => {
    app.set('db',dbInstance)
    console.log('db ready')
    app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`))
    // app.listen(webSocketsServerPort, () => console.log(`websockets running on ${webSocketsServerPort}`))
    // console.log('web socket server',webSocketServer())
})

