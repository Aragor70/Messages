const asyncHandler = require("../../middleware/async")
const Message = require("../../models/Message")
const Notification = require("../../models/Notification")
const ErrorResponse = require("../../tools/ErrorResponse")


class MessageController {

    getAboutMessages = asyncHandler( async(req, res, next) => {
    
        const notification = await Notification.findOne({ user: req.user.id }).populate({ path: 'messenger.messages', model: 'Message', populate: { path: 'user = recipient', model: 'User' }})
        
        if (!notification) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
        const messages = await notification.messenger.messages
        
        return res.json(messages)
    
    })

    getAboutMessage = asyncHandler( async(req, res, next) => {
    
        const notification = await Notification.findOne({ user: req.user.id });
        
        if (!notification) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
        const message = await notification.messenger.messages.filter(element => element._id.toString() === req.params.id)
        
        return res.json(message)
    
    })

    deleteAboutMessage = asyncHandler( async(req, res, next) => {
        
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
        
        await recipient.save()
        
        return res.json({ success: true, message: 'Notification removed.' })
    
    })
}

module.exports = MessageController