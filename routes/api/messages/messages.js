const express = require('express');
const { check, validationResult } = require('express-validator');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const Chat = require('../../../models/Chat');
const Friendship = require('../../../models/Friendship');
const Message = require('../../../models/Message');
const Messenger = require('../../../models/Messenger');
const Notification = require('../../../models/Notification');
const User = require('../../../models/User');
const ErrorResponse = require('../../../tools/errorResponse');
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
    const friendship = await Friendship.findOne({ "users": { $all: [req.params.id, req.user.id] } });
    // console.log(friendship, 'friendship')
    if (!messenger || !recipient) {
        return next(new ErrorResponse('User not found.', 404))
    }
    if (!messenger.turn_on || !recipient.turn_on) {
        return next(new ErrorResponse('User does not allow to get this content.', 404))
    }
    if (!friendship ) {
        return next(new ErrorResponse(`Please invite ${recipient.user.name} to your friends list.`, 404))
    }
    const textUpperCase = text.charAt(0).toUpperCase() + text.slice(1);
    let chat = await Chat.findOne({ users: {$all: [ req.params.id, req.user.id ]} });
    // console.log(chat, 'chats')
    
    if (!chat) {
        chat = new Chat({
            users: [
                req.user.id, 
                req.params.id
            ]
        })
        
        await chat.save()
        // console.log('chat')
        messenger.chats.unshift(chat._id)
        recipient.chats.unshift(chat._id)
        
    }


    const message = new Message({
        user: messenger.user._id,
        recipient: recipient.user._id,
        text: textUpperCase
    })
    await message.save()
    
    await chat.messages.unshift(message._id)
    
    
    await messenger.save()
    await recipient.save()
    await chat.save()

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


//route GET    api/messages/:id
//description  get single message
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const message = await Message.findById( req.params.id ).populate('user = recipient', ['name', 'avatar'])
    if (!message) {
        return next(new ErrorResponse('Message not found.', 404))
    }


    res.json( message )
}))

//route GET    api/messages/:id
//description  get messages with user by id
//access       private
/* router.get('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const messages = await Message.find({ "users":{ _id: req.user.id, _id: req.params.id } }).populate('user = recipient', ['name', 'avatar'])
    if (!messages) {
        return next(new ErrorResponse('Messages not found.', 404))
    }


    res.json( messages )
})); */

//route PUT    api/messages/:id
//description  edit single communication
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {
    const { seen, opened, liked } = req.body;
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
    
    if (!seen && !opened && !liked) {
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
    else if (liked) {
        message.liked = !message.liked;
        feedback = `${message.recipient.name} has liked your message.`
    }
    
    if (notification && notification.turn_on && notification.feedback.turn_on && feedback) {
        await notification.feedback.messages.unshift({ message: feedback })
        await notification.save()
    }
    
    await message.save()
    
    res.json({ success: true, message })

}));

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
    
    const chat = await Chat.findOne({"users": { $all: [message.recipient._id, message.user._id] }});
    if (chat) {
        chat.messages = chat.messages.filter(msg => msg._id.toString() !== message._id.toString())
    }
    
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

}));
module.exports = router;