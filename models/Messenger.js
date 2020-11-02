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
    messages: [{
        message: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
        
    }]
    
    
})
module.exports = Messenger = mongoose.model('Messenger', MessengerSchema);