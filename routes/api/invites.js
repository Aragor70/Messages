const express = require('express');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');
const Invite = require('../../models/Invite');
const Notification = require('../../models/Notification');
const ErrorResponse = require('../../tools/errorResponse');
const router = express.Router();


//route DELETE api/invites/:id
//description  remove user invitation
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    
    const invite = await Invite.findById(req.params.id).populate('user = recipient', ['name', 'avatar']);
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
    
    await recipient.save()
    
    await invite.remove()

    message = 'Invitation removed.'
    
    res.json({ success: true, message })

}))
module.exports = router;