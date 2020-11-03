require ('dotenv').config({ path: 'config/config.env' })
const cookieParser = require('cookie-parser');
const express = require('express');
const connect = require('./config/connect');
const errorHandler = require('./middleware/error');
const app = express()

connect()

app.use(express.json({ extended: false }))
app.use(cookieParser())

app.use('/api/auth/', require('./routes/api/auth/auth'))
app.use('/api/auth/two_factor', require('./routes/api/auth/two_factor'))

app.use('/api/users/', require('./routes/api/users/users'))
app.use('/api/users/roles', require('./routes/api/users/roles'))

app.use('/api/abouts/', require('./routes/api/abouts'))
app.use('/api/messages/', require('./routes/api/messages'))
app.use('/api/services/', require('./routes/api/services'))
app.use('/api/invites/', require('./routes/api/invites'))
app.use('/api/messengers/', require('./routes/api/messengers'))

app.use('/api/profiles/', require('./routes/api/profiles/profiles'))
app.use('/api/profiles/friends', require('./routes/api/profiles/friends'))


app.use('/api/notifications/', require('./routes/api/notifications/notifications'))
app.use('/api/notifications/invites/', require('./routes/api/notifications/invites'))
app.use('/api/notifications/messages/', require('./routes/api/notifications/messages'))
app.use('/api/notifications/services/', require('./routes/api/notifications/services'))


app.use(errorHandler)


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`));

process.on('unhandledRejection', (err, _promise) => {
    console.error(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})