const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    age: {
        type: Date
    },
    gender: {
        type: String
    },
    status: {
        type: String
    },
    social: {
        youtube:{
            type: String
        },
        twitter:{
            type: String
        },
        facebook:{
            type: String
        },
        linkedin:{
            type: String
        },
        instagram:{
            type: String
        }
    }
    
})
module.exports = About = mongoose.model('About', AboutSchema);