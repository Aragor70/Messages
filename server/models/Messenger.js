const mongoose = require('mongoose');

const MessengerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    turn_on: {
        type: Boolean,
        default: true
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }]
})
module.exports = Messenger = mongoose.model('Messenger', MessengerSchema);