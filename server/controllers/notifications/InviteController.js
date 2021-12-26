const asyncHandler = require("../../middleware/async");
const Invite = require("../../models/Invite");
const Notification = require("../../models/Notification");
const ErrorResponse = require("../../tools/ErrorResponse");



class InviteController {

    getInvites = asyncHandler( async(req, res, next) => {
    
        const notification = await Notification.findOne({ user: req.user.id }).populate({ path: 'invite.messages', model: 'Invite', populate: { path: 'user = recipient', model: 'User' }});
        
        if (!notification) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
        const invitesList = await notification.invite.messages
        //console.log(notification)
    
        return res.json(invitesList)
    
    })

    deleteInvite = asyncHandler( async(req, res, next) => {
    
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
            recipient.invite.messages = await recipient.invite.messages.filter(message => message._id.toString() !== invite._id.toString())
        }
    
        await recipient.save()
        
        return res.json({ success: true, message })
    
    })
}

module.exports = InviteController;