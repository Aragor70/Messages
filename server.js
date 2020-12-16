require ('dotenv').config({ path: 'config/config.env' })
const cookieParser = require('cookie-parser');
const express = require('express');
const connect = require('./config/connect');
const errorHandler = require('./middleware/error');
const app = express();
const socketio = require('socket.io');
const http = require('http')

connect()

app.use(express.json({ extended: false }))
app.use(cookieParser())

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    
    console.log('new connection')

    socket.on('join', ({ user, recipient }) => {
        socket.id = user
        
        console.log(`Socket ${socket.id} joining ${recipient}`);
        socket.join(recipient);
     });

    socket.on('disconnect', () => {
        console.log(socket.id)
    })

})


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