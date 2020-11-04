const express = require('express');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const Notification = require('../../../models/Notification');
const ErrorResponse = require('../../../tools/errorResponse');
const router = express.Router();

//route GET    api/notification
//description  get own notification
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    const notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
        return next(new ErrorResponse('Notification not found.', 404));
    }

    res.json(notification);
}))

//route PUT    api/notification
//description  switch on/off notification
//access       private
router.put('/', auth, asyncHandler( async(req, res, next) => {
    const { turn_on, invites, messages, services } = req.body;

    let message = ''
    const notification = await Notification.findOne(req.user.id);
    if (!notification) {
        return next(new ErrorResponse('Notification not found.', 404));
    }

    if (turn_on) {
        notification.turn_on = !notification.turn_on;
        message = `Notifications switched ${notification.turn_on ? 'On' : 'Off'}.`
        await notification.save()
        res.json({ success: true, message, notification })
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
        message = `Notifications of services switched ${notification.messenger.service.turn_on ? 'On' : 'Off'}.`
        await notification.save()
        return res.json({ success: true, message, notification })
    }
    
    message = 'Please choose the option.'

    res.json({ success: false, message, notification })
    
}));

//route DELETE api/notifications
//description  delete all notifications
//access       private
router.delete('/', auth, asyncHandler( async(req, res, next) => {
    const notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
        return next(new ErrorResponse('Notification not found.', 404));
    }
    notification.messenger.messages = []
    notification.invite.messages = []
    notification.service.messages = []
    notification.feedback.messages = []

    await notification.save()
    
    res.json(message);
}))

//route GET    api/notifications/feedback
//description  get own feedback messages
//access       private
router.get('/feedback', auth, asyncHandler( async(req, res, next) => {
    const notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
        return next(new ErrorResponse('Notification not found.', 404));
    }
    const messages = notification.feedback.messages

    res.json(messages);
}))

//route GET    api/notifications/feedback/:id
//description  get single feedback message - optional route
//access       private
router.get('/feedback/:id', auth, asyncHandler( async(req, res, next) => {
    const notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
        return next(new ErrorResponse('Notification not found.', 404));
    }
    const message = notification.feedback.messages.filter(message => message._id.toString() === req.params.id)

    res.json(message[0]);
}))

//route PUT    api/notifications/feedback
//description  switch on/off feedback messages
//access       private
router.put('/feedback', auth, asyncHandler( async(req, res, next) => {
    let message = ''
    const notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
        return next(new ErrorResponse('Notification not found.', 404));
    }
    notification.feedback.turn_on = !notification.feedback.turn_on
    message = `Messages switched ${notification.feedback.turn_on ? 'On' : 'Off'}.`
    await notification.save()

    res.json({ success: true, notification, message });
}));

//route DELETE api/notifications/feedback/:id
//description  delete feedback message
//access       private
router.delete('/feedback/:id', auth, asyncHandler( async(req, res, next) => {
    const notification = await Notification.findOne({ user: req.user.id });
    if (!notification) {
        return next(new ErrorResponse('Notification not found.', 404));
    }
    notification.feedback.messages = notification.feedback.messages.filter(message => message._id.toString() !== req.params.id)
    await notification.save()
    
    res.json(message);
}))
module.exports = router;