const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    turn_on: {
        type: Boolean,
        default: true
    },
    service: {
        turn_on: {
            type: Boolean,
            default: true
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }]
    },
    messenger: {
        turn_on: {
            type: Boolean,
            default: true
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }]
    },
    invite: {
        turn_on: {
            type: Boolean,
            default: true
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invite' 
        }]
    },
    feedback:{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        turn_on: {
            type: Boolean,
            default: true
        },
        messages: [{
            message : {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }]
    }
})
module.exports = Notification = mongoose.model('Notification', NotificationSchema);