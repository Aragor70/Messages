const asyncHandler = require("../../middleware/async");
const Notification = require("../../models/Notification");
const Service = require("../../models/Service");
const ErrorResponse = require("../../tools/ErrorResponse");


class ServiceController {

    getServiceNotifications = asyncHandler( async(req, res, next) => {
    
        const notification = await Notification.findOne({ user: req.user.id }).populate({ path: 'service.messages', model: 'Service', populate: { path: 'user = recipient', model: 'User' }});
        
        if (!notification) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
        const services = notification.service.messages
    
        res.json(services)
    })

    getServiceNotificationById = asyncHandler( async(req, res, next) => {
        const { seen, opened } = req.body;
        let message = '';
    
        let service = await Service.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
        if (!service) {
            return next(new ErrorResponse('Message not found.', 404))
        }
    
        // notification to send feedback message
        const notification = await Notification.findOne({ user: process.env.SERVICE_ID });
    
        if (service.recipient._id.toString() !== req.user.id) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
        if (!seen && !opened) {
            return next(new ErrorResponse('No option choosed.', 404))
        }
        if (seen) {
            service.seen = true;
            message = `${service.recipient.name} has seen service message.`
        }
        else if (opened) {
            service.opened = true;
            message = `${service.recipient.name} has opened service message.`
        }
    
        if (notification && notification.turn_on && notification.feedback.turn_on && message) {
            notification.feedback.messages = notification.feedback.messages.unshift({ message })
            await notification.save()
        }
    
        await service.save()
        
        return res.json({ success: true, service })
    
    })

    deleteServiceNotification = asyncHandler( async(req, res, next) => {
    
        const service = await Service.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
        let message = '';
        
        if (!service) {
            return next(new ErrorResponse('Message not found.', 404))
        }
        if (req.user.id.toString() === process.env.SERVICE_ID && service.recipient._id.toString() !== req.user.id.toString() ) {
            return next(new ErrorResponse('User not authorized', 401))
        }
    
        if (service.recipient._id.toString() === req.user.id.toString()) {
            message = `Notification service message removed.`
        }
    
    
        let recipient = await Notification.findOne({user: service.recipient._id});
        
        if (!recipient) {
            return next(new ErrorResponse('Recipient not found', 404))
        }

        recipient.service.messages = await recipient.service.messages.filter(message => message._id.toString() !== service._id.toString())
    
        await recipient.save()
        
        return res.json({ success: true, message })
    
    })

}

module.exports = ServiceController;