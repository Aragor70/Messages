require ('dotenv').config({ path: 'config/config.env' })
const cookieParser = require('cookie-parser');
const express = require('express');
const connect = require('./config/connect');
const errorHandler = require('./middleware/error');
const app = express()

connect()

app.use(express.json({ extended: false }))
// app.use(cookieParser())

app.use('/api/auth/', require('./routes/api/auth'))
app.use('/api/users/', require('./routes/api/users'))
app.use('/api/abouts/', require('./routes/api/abouts'))
app.use('/api/messages/', require('./routes/api/messages'))
app.use('/api/services/', require('./routes/api/services'))
app.use('/api/messengers/', require('./routes/api/messengers'))

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