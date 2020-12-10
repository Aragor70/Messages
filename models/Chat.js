const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    turn_on: {
        type: Boolean,
        default: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Chat = mongoose.model('Chat', ChatSchema);