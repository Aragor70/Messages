const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
    
    text: {
        type: String,
        maxlength: 50
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seen: {
        type: Boolean,
        default: false
    },
    opened: {
        type: Boolean,
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Invite = mongoose.model('Invite', InviteSchema);