const express = require('express');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');
const Notification = require('../../models/Notification');
const Service = require('../../models/Service');
const User = require('../../models/User');
const router = express.Router();



//route POST   api/services/:id
//description  send service communication to the user
//access       private - service router
router.post('/:id', auth, asyncHandler( async(req, res, next) => {

    const { text } = req.body;
    const user = await User.findById(req.user.id).select('-password');
    
    if (user._id !== process.env.SERVICE_ID) {
        return next(new ErrorResponse(`User not authorized.`, 401))
    }

    if (!recipient.turn_on || !recipient.service.turn_on) {
        return next(new ErrorResponse(`Recipient does not allow to get this content.`, 401))
    }
    
    const service = await Notification.findOne(process.env.SERVICE_ID);
    if (!service) {
        return next(new ErrorResponse('Service not found.', 401))
    }

    const recipient = await Notification.findOne(req.params.id);
    if (!recipient) {
        return next(new ErrorResponse('Recipient not found.', 404))
    }
    const textUpperCase = text.charAt(0).toUpperCase() + text.slice(1);
    

    const service = new Service({
        user: user._id,
        recipient: req.params.id,
        text: text ? textUpperCase : 'Hi, there :)'
    })

    await service.save()
    await recipient.service.messages.unshift(service._id)

    await recipient.save()
}))


//route GET    api/services
//description  get user all service communications
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    
    const notification = await Notification.findOne({ user: req.user.id });
    
    if (!notification) {
        return next(new ErrorResponse('User not authorized.', 401))
    }
    const services = notification.service.messages
    

    res.json(services)

}))

//route GET    api/services/:id
//description  get the single service communication
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const service = await Service.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
    
    if (!service) {
        return next(new ErrorResponse('Message not found.', 404))
    }
    if (req.user.id !== process.env.SERVICE_ID && service.recipient._id !== req.user.id) {
        return next(new ErrorResponse('User not authorized.', 401))
    }

    res.json(service)

}))

//route PUT    api/services/:id
//description  edit single communication
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {
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
    
    res.json({ success: true, service })

}))

//route DELETE api/services/:id
//description  remove service communication
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    
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
    recipient.service.messages = recipient.service.messages.filter(message => message._id.toString() !== service._id.toString())
    
    if (notification && notification.turn_on && notification.feedback.turn_on && message) {
        notification.feedback.messages = notification.feedback.messages.unshift({ message })
        await notification.save()
    }

    await notification.save()
    await recipient.save()

    await service.remove()
    
    res.json({ success: true, message })

}))