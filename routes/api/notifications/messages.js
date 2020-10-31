const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const Message = require('../../../models/Message');
const Messenger = require('../../../models/Messenger');
const Notification = require('../../../models/Notification');
const Profile = require('../../../models/Profile');
const User = require('../../../models/User');
const router = express.Router();



//route GET    api/notifications/messages
//description  get list of message notifications
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    
    const notification = await Notification.findOne({ user: req.user.id });
    
    if (!notification) {
        return next(new ErrorResponse('User not authorized.', 401))
    }
    const messages = notification.messenger.messages
    
    res.json(messages)

}))

//route GET    api/notifications/messages/:id
//description  get single message notification
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const notification = await Notification.findOne({ user: req.user.id });
    
    if (!notification) {
        return next(new ErrorResponse('User not authorized.', 401))
    }
    const message = notification.messenger.messages.filter(element => element._id.toString() === req.params.id)
    
    res.json(message)

}))

//route PUT    api/notifications/messages/:id
//description  edit single communication
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {
    const { seen, opened } = req.body;
    let feedback = '';

    let message = await Message.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
    if (!message) {
        return next(new ErrorResponse('Message not found.', 404))
    }

    // notification to send feedback message
    const notification = await Notification.findOne({ user: message.user._id });

    if (message.recipient._id.toString() !== req.user.id) {
        return next(new ErrorResponse('User not authorized.', 401))
    }
    if (!seen && !opened) {
        return next(new ErrorResponse('No option choosed.', 404))
    }
    if (seen) {
        message.seen = true;
        feedback = `${message.recipient.name} has seen the message.`
    }
    else if (opened) {
        message.opened = true;
        feedback = `${message.recipient.name} has opened the message.`
    }

    if (notification && notification.turn_on && notification.feedback.turn_on && feedback) {
        notification.feedback.messages = notification.feedback.messages.unshift({ message: feedback })
        await notification.save()
    }

    await message.save()
    
    res.json({ success: true, message })

}))


//route DELETE api/notifications/messages/:id
//description  remove message notification
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const message = await Message.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])

    if (!message) {
        return next(new ErrorResponse('Message not found.', 404))
    }
    if (req.user.id.toString() !== message.user._id.toString() && message.recipient._id.toString() !== req.user.id.toString() ) {
        return next(new ErrorResponse('User not authorized', 401))
    }

    let recipient = await Notification.findOne({user: message.recipient._id});
    
    if (!recipient) {
        return next(new ErrorResponse('Recipient not found', 404))
    }
    recipient.messenger.messages = recipient.messenger.messages.filter(element => element._id.toString() !== message._id.toString())
    

    await notification.save()
    await recipient.save()
    
    res.json({ success: true, message: 'Notification from removed.' })

}))
module.exports = router;