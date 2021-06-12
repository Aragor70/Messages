const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const asyncHandler = require('../../../middleware/async');
const User = require('../../../models/User');
const Notification = require('../../../models/Notification');
const Invite = require('../../../models/Invite');
const ErrorResponse = require('../../../tools/ErrorResponse');


//route GET    api/notifications/invites
//description  get user invitation list
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    
    const notification = await Notification.findOne({ user: req.user.id }).populate({ path: 'invite.messages', model: 'Invite', populate: { path: 'user = recipient', model: 'User' }});
    
    if (!notification) {
        return next(new ErrorResponse('User not authorized.', 401))
    }
    const invitesList = notification.invite.messages
    //console.log(notification)

    res.json(invitesList)

}))




//route DELETE api/notifications/invites/:id
//description  remove user invitation notification
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const invite = await Invite.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
    let message = '';
    
    if (!invite) {
        return next(new ErrorResponse('Invitation not found.', 404))
    }
    if (invite.user._id.toString() !== req.user.id.toString() && invite.recipient._id.toString() !== req.user.id.toString() ) {
        return next(new ErrorResponse('User not authorized', 401))
    }
    
    let recipient = await Notification.findOne({user: invite.recipient._id});
    
    if (recipient) {
        recipient.invite.messages = recipient.invite.messages.filter(message => message._id.toString() !== invite._id.toString())
    }

    await recipient.save()
    
    res.json({ success: true, message })

}))
module.exports = router;