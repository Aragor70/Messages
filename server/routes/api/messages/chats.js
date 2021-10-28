const express = require('express');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const Chat = require('../../../models/Chat');
const Messenger = require('../../../models/Messenger');
const ErrorResponse = require('../../../tools/ErrorResponse');
const router = express.Router();


//route GET    api/messengers
//description  get own chats list
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {

    const messenger = await Messenger.findOne({ user: req.user.id }).populate({path: 'chats chat', model: 'Chat', populate: { path: 'messages message', model: 'Message', populate: { path: 'user user', model: 'User' } }}).populate({path: 'chats chat', model: 'Chat', populate: { path: 'users user', model: 'User', populate: { path: 'user user', model: 'User' } }})
    console.log(messenger)
    if (!messenger) {
        return next(new ErrorResponse('Messenger not found.', 404))
    }

    const compareFunction = (a, b) => {
        let valueA = a.messages[0].date
        let valueB = b.messages[0].date

        return valueB.getTime() - valueA.getTime();
    }

    const chats = messenger.chats.sort(compareFunction)
    
    res.json( chats )
}))

//route GET    api/messengers
//description  get single chat with other user
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {

    // const chat = await Chat.findById(req.params.id).populate('message messages').populate('user = users', ['name', 'avatar']);
    let chat = await Chat.findOne({ "users": { $all: [req.params.id, req.user.id] } }).populate({ path: 'messages message', model: 'Message', populate: { path: 'recipient user', model: 'User' }}).populate('user = users', ['name', 'avatar']);
    //console.log(chat)
    const compareFunction = (a, b) => {
        let valueA = new Date(a.date)
        let valueB = new Date(b.date)
        
        
        return valueA.getTime() - valueB.getTime()
    }
    // console.log(chat)
    // User.findOne({ name: 'Val' }).populate({ path: 'friends', populate: { path: 'friends' } });
    
    // Get friends of friends - populate the 'friends' array for every friend
    chat = {...chat, messages: chat.messages.sort(compareFunction)}
    
    if (!chat) {
        return next(new ErrorResponse('Messenger not found.', 404))
    }
    
    res.json( chat )
}))

//route DELETE api/messengers
//description  delete chat with user id
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {

    let message = ''

    const chat = await Chat.findOne({ "users": { $all: [req.params.id, req.user.id] } }).populate('user = users', ['name', 'avatar']);
    if (!chat) {
        return next(new ErrorResponse('Messenger not found.', 404))
    }
    const messenger = await Messenger.findById(req.user.id)
    const recipient = await Messenger.findById(req.params.id)

    messenger.chats = messenger.chats.filter(element => element._id.toString() !== chat._id.toString())
    recipient.chats = recipient.chats.filter(element => element._id.toString() !== chat._id.toString())

    await messenger.save()
    await recipient.save()

    await chat.remove()
    message = 'Chat removed.'

    res.json({ success: true, message })
}))
module.exports = router;