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
app.use('/api/about/', require('./routes/api/about'))
app.use('/api/invites/', require('./routes/api/invites'))


app.use(errorHandler)


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`));

process.on('unhandledRejection', (err, _promise) => {
    console.error(`Error message: ${err.message}`)
    server.close(() => process.exit(1))
})