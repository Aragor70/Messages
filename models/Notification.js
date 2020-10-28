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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        turnOn: {
            type: Boolean,
            default: true
        },
        messages: [{
            message:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service'
            }
        }]  
    },
    messenger: {
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
    },
    invite: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        turn_on: {
            type: Boolean,
            default: true
        },
        messages: [{
            invite: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Invite'
            }
        }]
    }
    
})
module.exports = Notification = mongoose.model('Notification', NotificationSchema);