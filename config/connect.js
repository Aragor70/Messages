const mongoose = require('mongoose');



module.exports = async () => {
    try {
        const connect = await mongoose.connect(process.env.dbURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected...')
        console.log(connect.connection.host)
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
    
}