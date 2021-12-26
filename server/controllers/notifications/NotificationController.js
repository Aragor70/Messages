const asyncHandler = require("../../middleware/async");
const Notification = require("../../models/Notification");
const ErrorResponse = require("../../tools/ErrorResponse");


class NotificationController {


    getOwnNotifications = asyncHandler( async(req, res, next) => {
        const notification = await Notification.findOne({ user: req.user.id });
        if (!notification) {
            return next(new ErrorResponse('Notification not found.', 404));
        }
    
        return res.json(notification);
    })

    switchOnOff = asyncHandler( async(req, res, next) => {
        const { turn_on, invites, messages, services } = req.body;
        
        let message = ''
        const notification = await Notification.findOne({ user: req.user.id });
        
        if (!notification) {
            return next(new ErrorResponse('Notification not found.', 404));
        }
    
        if (turn_on) {
            notification.turn_on = !notification.turn_on;
            message = `Notifications switched ${notification.turn_on ? 'On' : 'Off'}.`
            await notification.save()
            return res.json({ success: true, message, notification })
        }
        else if (invites) {
            notification.invite.turn_on = !notification.invite.turn_on;
            message = `Notifications of invites switched ${notification.invite.turn_on ? 'On' : 'Off'}.`
            await notification.save()
            return res.json({ success: true, message, notification })
        }
        else if (messages) {
            notification.messenger.turn_on = !notification.messenger.turn_on;
            message = `Notifications of messages switched ${notification.messenger.turn_on ? 'On' : 'Off'}.`
            await notification.save()
            return res.json({ success: true, message, notification })
        }
        else if (services) {
            
            notification.service.turn_on = !notification.service.turn_on;
            
            message = `Notifications of services switched ${notification.service.turn_on ? 'On' : 'Off'}.`
            
            await notification.save()
            
            return res.json({ success: true, message, notification })
        }
        
        message = 'Please choose the option.'
    
        return res.json({ success: false, message, notification })
        
    })

    deleteAll = asyncHandler( async(req, res, next) => {
        const notification = await Notification.findOne({ user: req.user.id });
        if (!notification) {
            return next(new ErrorResponse('Notification not found.', 404));
        }
        notification.messenger.messages = []
        notification.invite.messages = []
        notification.service.messages = []
        notification.feedback.messages = []
    
        await notification.save()
        
        return res.json(message);
    })

    getOwnFeedback = asyncHandler( async(req, res, next) => {
        const notification = await Notification.findOne({ user: req.user.id });
        if (!notification) {
            return next(new ErrorResponse('Notification not found.', 404));
        }
        const messages = await notification.feedback.messages
    
        return res.json(messages);
    })

    getFeedbackById = asyncHandler( async(req, res, next) => {
        const notification = await Notification.findOne({ user: req.user.id });
        if (!notification) {
            return next(new ErrorResponse('Notification not found.', 404));
        }
        const message = await notification.feedback.messages.filter(message => message._id.toString() === req.params.id)
    
        return res.json(message[0]);
    })

    switchFeedbackOnOff = asyncHandler( async(req, res, next) => {
        let message = ''
        const notification = await Notification.findOne({ user: req.user.id });
        if (!notification) {
            return next(new ErrorResponse('Notification not found.', 404));
        }
        notification.feedback.turn_on = !notification.feedback.turn_on
        message = `Messages switched ${notification.feedback.turn_on ? 'On' : 'Off'}.`
        await notification.save()
    
        return res.json({ success: true, notification, message });
    })

    deleteFeedback = asyncHandler( async(req, res, next) => {
        const notification = await Notification.findOne({ user: req.user.id });
        if (!notification) {
            return next(new ErrorResponse('Notification not found.', 404));
        }
        notification.feedback.messages = await notification.feedback.messages.filter(message => message._id.toString() !== req.params.id)
        await notification.save()
        
        return res.json(message);
    })
    
}

module.exports = NotificationController;