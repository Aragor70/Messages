require ('dotenv').config({ path: 'config/config.env' })
const express = require('express');
const connect = require('./config/connect');
const app = express()

connect()

app.use(express.json())
app.use('/', () => console.log('Server is running...'))


/* app.use('/api/auth/', require('./routes/api/auth')) */





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`));

