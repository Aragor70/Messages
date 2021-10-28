require ('dotenv').config({ path: 'config/config.env' })
const cookieParser = require('cookie-parser');
const express = require('express');
const connect = require('./config/connect');
const errorHandler = require('./middleware/error');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

connect()

const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

app.use(express.json({ extended: false }))
app.use(cookieParser())

const server = http.createServer(app)
const io = socketio(server)

let clients = [];
let messages = [];

io.on('connection', (socket) => {
    
    console.log('New client');
    
    socket.on('join', ({ id, chat = 'chat' }) => {

        console.log(chat, "chat");

        console.log(id, "user");
        
        socket.join(chat);

        clients = [...clients, { id, socketId: socket.id, chat }]

        socket.broadcast.emit("welcome", clients );

        socket.emit("success", `You have joined to the room ${chat}`);

        
        socket.emit("userlist", clients);

        console.log('logged in', clients.length)

        socket.on('disconnect', () => {

            io.emit("welcome", clients );

            io.emit('userlist', clients.filter(user => user.id != id))
            console.log('Socket disconnected: ' + socket.id)
            clients = clients.filter(user => user.id != id)
            console.log('logged out', clients.length)
        });
        
    });
    socket.on('invite', (formData) => {
        if (formData) {
            socket.broadcast.emit('invite', formData)
        }
        
    })
    socket.on('deleteinvite', (formData) => {
        if (formData) {
            
            socket.broadcast.emit('deleteinvite', formData)
        }
        
    })
    socket.on('chat', (formData) => {
        if (formData) {
            //console.log(formData, 'sent message')
            messages = [...messages, formData]
            socket.broadcast.emit('chat', formData)
        }
        
    })
    socket.on('deletemessage', (formData) => {
        if (formData) {
            messages = messages.filter(element => element.message._id != formData.id)
            
            socket.broadcast.emit('deletemessage', formData)
        }
        
    })
//
    socket.on('deletefriend', (formData) => {
        if (formData) {
            
            
            socket.broadcast.emit('deletefriend', formData)
        }
        
    })

    socket.on('updateinvite', (formData) => {
        if (formData) {
            
            socket.broadcast.emit('updateinvite', formData)
        }
        
    })
    socket.on('updatemessage', (formData) => {
        if (formData) {
            
            socket.broadcast.emit('updatemessage', formData)
        }
        
    })
    socket.on('deletemessagenotification', (formData) => {
        if (formData) {
            
            socket.broadcast.emit('deletemessagenotification', formData)
        }
        
    })
    
});


app.use('/api/auth/', require('./routes/api/auth/auth'))
app.use('/api/auth/two_factor', require('./routes/api/auth/two_factor'))

app.use('/api/users/', require('./routes/api/users/users'))
app.use('/api/users/roles', require('./routes/api/users/roles'))

app.use('/api/abouts/', require('./routes/api/abouts'))
app.use('/api/services/', require('./routes/api/services'))
app.use('/api/invites/', require('./routes/api/invites'))

app.use('/api/messages/chats/', require('./routes/api/messages/chats'))
app.use('/api/messages/messengers/', require('./routes/api/messages/messengers'))
app.use('/api/messages/', require('./routes/api/messages/messages'))

app.use('/api/friends', require('./routes/api/friends'))
app.use('/api/recipients', require('./routes/api/recipients/recipients'))


app.use('/api/notifications/', require('./routes/api/notifications/notifications'))
app.use('/api/notifications/invites/', require('./routes/api/notifications/invites'))
app.use('/api/notifications/messages/', require('./routes/api/notifications/messages'))
app.use('/api/notifications/services/', require('./routes/api/notifications/services'))


app.use(errorHandler)


const PORT = process.env.PORT || 5000;


server.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`));

process.on('unhandledRejection', (err, _promise) => {
    console.error(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})