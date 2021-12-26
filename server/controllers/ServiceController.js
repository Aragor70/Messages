const asyncHandler = require("../middleware/async");
const Notification = require("../models/Notification");
const Service = require("../models/Service");
const User = require("../models/User");
const ErrorResponse = require("../tools/ErrorResponse");



class ServiceController {


    sendMessage = asyncHandler( async(req, res, next) => {
    
        const { text } = req.body;
        const user = await User.findById(req.user.id).select('-password');
        
        if (user._id !== process.env.SERVICE_ID) {
            return next(new ErrorResponse(`User not authorized.`, 401))
        }
    
        if (!recipient.turn_on || !recipient.service.turn_on) {
            return next(new ErrorResponse(`Recipient does not allow to get this content.`, 401))
        }
        
        const notification = await Notification.findOne(process.env.SERVICE_ID);
        if (!notification) {
            return next(new ErrorResponse('Service not found.', 401))
        }
    
        const recipient = await Notification.findOne(req.params.id);
        if (!recipient) {
            return next(new ErrorResponse('Recipient not found.', 404))
        }
        const textUpperCase = await text.charAt(0).toUpperCase() + text.slice(1);
        
    
        const service = new Service({
            user: user._id,
            recipient: recipient.user,
            text: text ? textUpperCase : 'Hi, there :)'
        })
    
        await service.save()
        await recipient.service.messages.unshift(service._id)
    
        await recipient.save()
        
        return res.json(recipient)
    })

    getMessage = asyncHandler( async(req, res, next) => {
    
        const service = await Service.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
        
        if (!service) {
            return next(new ErrorResponse('Message not found.', 404))
        }
        if (req.user.id !== process.env.SERVICE_ID && service.recipient._id !== req.user.id) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
    
        return res.json(service)
    
    })

    deleteMessage = asyncHandler( async(req, res, next) => {
    
        const service = await Service.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
        let message = '';
        
        if (!service) {
            return next(new ErrorResponse('Message not found.', 404))
        }
        if (req.user.id.toString() === process.env.SERVICE_ID && service.recipient._id.toString() !== req.user.id.toString() ) {
            return next(new ErrorResponse('User not authorized', 401))
        }
    
        if (process.env.SERVICE_ID === req.user.id.toString()) {
            message = `Service message to ${service.recipient.name} removed.`
        } else if (service.recipient._id.toString() === req.user.id.toString()) {
            message = `Service message removed.`
        }
    
        let notification = await Notification.findOne({ user: process.env.SERVICE_ID });
        
    
        let recipient = await Notification.findOne({user: service.recipient._id});
        
        if (!recipient) {
            return next(new ErrorResponse('Recipient not found', 404))
        }
        recipient.service.messages = await recipient.service.messages.filter(message => message._id.toString() !== service._id.toString())
        
        if (notification && notification.turn_on && notification.feedback.turn_on && message) {
            await notification.feedback.messages.unshift({ message })
            await notification.save()
        }
    
        await notification.save()
        await recipient.save()
    
        await service.remove()
        
        return res.json({ success: true, message })
    
    })

}

module.exports = ServiceController;