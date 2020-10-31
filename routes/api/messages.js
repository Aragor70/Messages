const express = require('express');
const { check, validationResult } = require('express-validator');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');
const Message = require('../../models/Message');
const Messenger = require('../../models/Messenger');
const Notification = require('../../models/Notification');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const ErrorResponse = require('../../tools/errorResponse');
const router = express.Router();


//route POST   api/messages
//description  send the message and apply for notification
//access       private
router.post('/:id', [auth, [
    check('text', 'Please enter the message.')
    .not()
    .isEmpty()
]], asyncHandler( async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(errors.array()[0].msg, 422))
    }

    const { text } = req.body;
    
    const user = await Messenger.findById(req.user.id).populate('user', ['name', 'avatar'])
    const recipient = await Messenger.findById(req.params.id).populate('user', ['name', 'avatar'])
    const profile = await Profile.findOne(req.user.id)
    if (!user || !recipient || !profile) {
        return next(new ErrorResponse('User not found.', 404))
    }
    if (!user.turn_on || !recipient.turn_on) {
        return next(new ErrorResponse('User does not allow to get this content.', 404))
    }
    const isFriend = profile.friends.filter(friend => friend._id.toString() === user.user._id)
    if (!isFriend ) {
        return next(new ErrorResponse(`Please invite ${recipient.user.name} to your friends list.`, 404))
    }
    const textUpperCase = text.charAt(0).toUpperCase() + text.slice(1);

    const message = new Message({
        user: user._id,
        recipient: recipient.user._id,
        text: textUpperCase
    })
    await message.save()
    
    user.messages.unshift( message._id )
    recipient.messages.unshift( message._id )
    await user.save()
    await recipient.save()

    const notification = await Notification.findOne({ user: recipient.user._id });

    if (notification && notification.turn_on && notification.messenger.turn_on) {
        notification.messenger.messages.unshift({ message: message._id})
        await notification.save()
    }

    res.json({ success: true, message })

}))

//route GET    api/messages
//description  get messenger messages
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {

    const messenger = await Messenger.findOne({ user: req.user.id });
    if (!messenger) {
        return next(new ErrorResponse('Messenger not found.', 404))
    }
    const messages = messenger.messages

    res.json( messages )
}))

//route GET    api/messages
//description  get single message
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {

    const message = await Message.findById( req.params.id ).populate('user = recipient', ['name', 'avatar'])
    if (!message) {
        return next(new ErrorResponse('Message not found.', 404))
    }

    res.json( message )
}))

//route DELETE api/messages/:id
//description  delete single message
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const message = await Message.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])

    if (!message) {
        return next(new ErrorResponse('Message not found.', 404))
    }
    if (req.user.id.toString() !== message.user._id.toString() && message.recipient._id.toString() !== req.user.id.toString() ) {
        return next(new ErrorResponse('User not authorized', 401))
    }

    // notification to send feedback
    let notification = await Notification.findOne({ user: message.user._id });
    
    
    if (notification && notification.turn_on && notification.feedback.turn_on) {
        notification.feedback.messages = notification.feedback.messages.unshift({ message: `Message with ${message.recipient.name} removed.` })
    }

    let recipient = await Notification.findOne({user: message.recipient._id});
    
    if (!recipient) {
        return next(new ErrorResponse('Recipient not found', 404))
    }
    recipient.messenger.messages = recipient.messenger.messages.filter(element => element._id.toString() !== message._id.toString())
    

    await notification.save()
    await recipient.save()
    
    await message.remove()

    res.json({ success: true, message: 'Message removed.' })

}))


module.exports = router;