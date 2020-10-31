const mongoose = require('mongoose');
const Notification = require('./Notification');

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

/* InviteSchema.pre('remove', async function(next) {
     console.log('Invite is being removed from user schema')
    
    const notification = Notification.findOne({ user: this.recipient._id });
    if (!notification) {
        return next(new ErrorResponse('Notification not found', 404));
    }
    console.log(notification.schema.tree.invite.messages)
    notification.schema.tree.invite.messages = notification.schema.tree.invite.messages.filter(element => element._id.toString() !== this._id)
    await notification.save()
    console.log('Invite removed from schema.')
    next();
}) */

module.exports = Invite = mongoose.model('Invite', InviteSchema);