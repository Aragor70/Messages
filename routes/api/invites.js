const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');
const Notification = require('../../models/Notification');
const Invite = require('../../models/Invite');
const ErrorResponse = require('../../tools/errorResponse');

//route POST   api/invites/:id
//description  send friend invitation
//access       private
router.post('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const { text } = req.body;

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return next(new ErrorResponse(`User not authorized`, 401))
    }
    const recipient = await Notification.findOne({ user: req.params.id }).select('-password');
    if (!recipient) {
        return next(new ErrorResponse('Recipient not found', 404))
    }
    const textUpperCase = text.charAt(0).toUpperCase() + text.slice(1);
    
    const invite = new Invite({
        user: user._id,
        recipient: recipient._id,
        text: text ? textUpperCase : 'Hi, there :)'
    })
    await invite.save()
    await recipient.invite.messages.unshift(invite._id)
    await recipient.save()

    res.json(recipient)

}))

//route GET    api/invites
//description  get user invitation list
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    
    const notification = await Notification.findOne({ user: req.user.id });
    
    if (!notification) {
        return next(new ErrorResponse('User not authorized', 401))
    }
    const invitesList = notification.invite.messages
    console.log(invitesList)

    res.json(invitesList)

}))

//route DELETE api/invites/:id
//description  get user invitation list
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const invite = await Invite.findById(req.params.id)
    
    
    if (!invite) {
        return next(new ErrorResponse('Invitation not found.', 404))
    }
    if (invite.user.toString() !== req.user.id.toString() && invite.recipient.toString() !== req.user.id.toString() ) {
        return next(new ErrorResponse('User not authorized', 401))
    }

    let notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
        return next(new ErrorResponse('User not authorized', 401))
    }
    notification.invite.messages = notification.invite.messages.filter(message => message._id.toString() !== invite._id.toString())
    

    let recipient = await Notification.findById(invite.recipient);
    
    if (!recipient) {
        return next(new ErrorResponse('Recipient not found', 404))
    }
    recipient.invite.messages = recipient.invite.messages.filter(message => message._id.toString() !== invite._id.toString())
    

    await notification.save()
    await recipient.save()

    
    await invite.remove()
    
    res.json({ success: true, message: 'Invitation removed.' })

}))

module.exports = router;