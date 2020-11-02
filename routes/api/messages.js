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
    const { text } = req.body;
    
    if (req.user.id === req.params.id) {
        return next(new ErrorResponse('Users are equals.', 422))
    }

    const messenger = await Messenger.findOne({ user: req.user.id }).populate('user', ['email', 'avatar']);
    const recipient = await Messenger.findOne({ user: req.params.id }).populate('user', ['email', 'avatar']);
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!messenger || !recipient || !profile) {
        return next(new ErrorResponse('User not found.', 404))
    }
    if (!messenger.turn_on || !recipient.turn_on) {
        return next(new ErrorResponse('User does not allow to get this content.', 404))
    }
    const isFriend = profile.friends.filter(friend => friend.toString() === messenger.user._id)
    if (!isFriend[0] ) {
        return next(new ErrorResponse(`Please invite ${recipient.user.name} to your friends list.`, 404))
    }
    const textUpperCase = text.charAt(0).toUpperCase() + text.slice(1);

    
    const message = new Message({
        user: messenger.user._id,
        recipient: recipient.user._id,
        text: textUpperCase
    })
    await message.save()
    
    messenger.messages.unshift( message._id )
    recipient.messages.unshift( message._id )
    
    
    await messenger.save()
    await recipient.save()
    

    const notification = await Notification.findOne({ user: recipient.user._id });
    if (!notification) {
        return next(new ErrorResponse('User not found.', 404))
    }
    if (notification && notification.turn_on && notification.messenger.turn_on) {
        notification.messenger.messages.unshift( message._id )
        await notification.save()
    }
    
    return res.json({ success: true, message })

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
        notification.feedback.messages.unshift({ message: `Message with ${message.recipient.name} removed.` })
        await notification.save()
    }

    let recipient = await Notification.findOne({user: message.recipient._id});
    
    if (recipient && recipient.turn_on && recipient.messenger.turn_on) {
        recipient.messenger.messages = recipient.messenger.messages.filter(element => element._id.toString() !== message._id.toString())
        await recipient.save()
    }
    
    await message.remove()

    res.json({ success: true, message: 'Message removed.' })

}))


module.exports = router;