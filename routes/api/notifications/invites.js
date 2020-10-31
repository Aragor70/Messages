const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const asyncHandler = require('../../../middleware/async');
const User = require('../../../models/User');
const Notification = require('../../../models/Notification');
const Invite = require('../../../models/Invite');
const ErrorResponse = require('../../../tools/errorResponse');
const Profile = require('../../../models/Profile');

//route POST   api/notifications/invites/:id
//description  send friend invitation
//access       private
router.post('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const { text } = req.body;

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return next(new ErrorResponse('User not authorized.', 401))
    }

    const recipient = await Notification.findOne({ user: req.params.id });
    if (!recipient) {
        return next(new ErrorResponse('Recipient not found.', 404))
    }

    if (!recipient.turn_on || !recipient.invite.turn_on) {
        return next(new ErrorResponse(`Recipient does not allow to get this content.`, 401))
    }

    const textUpperCase = text.charAt(0).toUpperCase() + text.slice(1);
    
    const invite = new Invite({
        user: user._id,
        recipient: req.params.id,
        text: text ? textUpperCase : 'Hi, there :)'
    })
    await invite.save()
    await recipient.invite.messages.unshift(invite._id)
    await recipient.save()

    res.json({ success: true, message:'Invitation sent.' })

}))

//route GET    api/notifications/invites
//description  get user invitation list
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    
    const notification = await Notification.findOne({ user: req.user.id });
    
    if (!notification) {
        return next(new ErrorResponse('User not authorized.', 401))
    }
    const invitesList = notification.invite.messages
    
    res.json(invitesList)

}))

//route GET    api/notifications/invites/:id
//description  get single invitation
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const invite = await Invite.findById(req.params.id).populate('user = recipient', ['name', 'avatar']);
    
    if (!invite) {
        return next(new ErrorResponse('Invitation not found.', 404))
    }
    if (invite.user._id !== req.user.id && invite.recipient._id !== req.user.id) {
        return next(new ErrorResponse('User not authorized.', 401))
    }

    res.json(invite)

}))


//route PUT    api/notifications/invites/:id
//description  edit single invitation
//access       private
router.put('/:id', auth, asyncHandler( async(req, res, next) => {
    const { seen, opened, accepted } = req.body;
    let message = '';

    let invite = await Invite.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
    if (!invite) {
        return next(new ErrorResponse('Invitation not found.', 404))
    }
    
    // notification to send feedback message
    const notification = await Notification.findOne({ user: invite.user._id });
    

    if (invite.recipient._id.toString() !== req.user.id) {
        return next(new ErrorResponse('User not authorized.', 401))
    }

    // profile to insert friend
    
    const profileU = await Profile.findOne({ user: invite.user._id });
    const profileR = await Profile.findOne({ user: invite.recipient._id});
    
    if (!seen && !opened && !accepted) {
        return next(new ErrorResponse('No option choosed.', 404))
    }
    if (seen) {
        invite.seen = true;
        // message = `${invite.recipient.name} has seen your invitation.`
    }
    else if (opened) {
        invite.opened = true;
        // message = `${invite.recipient.name} has opened your invitation.`
    }
    else if (accepted) {
        invite.accepted = true;
        message = `${invite.recipient.name} accepted your invitation.`
        await profileU.friends.unshift({ user: invite.recipient._id })
        await profileR.friends.unshift({ user: invite.user._id })
        await profileU.save()
        await profileR.save()
        await invite.remove()
    }
    await invite.save()

    if (notification && notification.turn_on && notification.feedback.turn_on && message) {
        notification.feedback.messages = notification.feedback.messages.unshift({ message })
        await notification.save()
    }
    
    res.json({ success: true, invite })

}))

//route DELETE api/notifications/invites/:id
//description  remove user invitation notification
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const invite = await Invite.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
    let message = '';
    
    if (!invite) {
        return next(new ErrorResponse('Invitation not found.', 404))
    }
    if (invite.user._id.toString() !== req.user.id.toString() && invite.recipient._id.toString() !== req.user.id.toString() ) {
        return next(new ErrorResponse('User not authorized', 401))
    }

    
    let recipient = await Notification.findOne({user: invite.recipient._id});
    
    if (recipient) {
        
        recipient.invite.messages = recipient.invite.messages.filter(message => message._id.toString() !== invite._id.toString())
    }

    await notification.save()
    await recipient.save()
    
    
    res.json({ success: true, message })

}))
module.exports = router;