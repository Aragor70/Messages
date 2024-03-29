const asyncHandler = require("../middleware/async");
const Chat = require("../models/Chat");
const Friendship = require("../models/Friendship");
const Invite = require("../models/Invite");
const Messenger = require("../models/Messenger");
const Notification = require("../models/Notification");
const User = require("../models/User");
const ErrorResponse = require("../tools/ErrorResponse");


class InviteController {

    sendInvite = asyncHandler( async(req, res, next) => {
    
        const { text } = req.body;
    
        if (req.user.id === req.params.id) {
            
            return next(new ErrorResponse('Users are equals.', 422))
        }
    
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
    
        const recipient = await Notification.findOne({ user: req.params.id }).populate('user', ['name', 'avatar']);
        if (!recipient) {
            return next(new ErrorResponse('Recipient not found.', 404))
        }
        
        if (!recipient.turn_on || !recipient.invite.turn_on) {
            return next(new ErrorResponse(`Recipient does not allow to get this content.`, 401))
        }
        
        const friendship = await Friendship.findOne({ "users": { $all: [recipient.user._id, user._id] } });
        
        if (friendship) {
            return next(new ErrorResponse(`${recipient.user.name} is your friend.`, 422)) 
        }
        const isMatch = await Invite.findOne({ user: recipient.user._id, recipient: user._id }) || await Invite.findOne({ user: user._id, recipient: recipient.user._id })
        
        if (isMatch) {
            
            return next(new ErrorResponse(`Invitation already exists.`, 422)) 
        }
        const textUpperCase = await text.charAt(0).toUpperCase() + text.slice(1);
        
        const invite = new Invite({
            user: user._id,
            recipient: req.params.id,
            text: text ? textUpperCase : 'Hi, there :)'
        })
    
        let chat = await Chat.findOne({ users: {$all: [ req.params.id, req.user.id ]} });
        // console.log(chat, 'chats')
        
        if (!chat) {
            chat = new Chat({
                users: [
                    req.user.id, 
                    req.params.id
                ]
            })
            
            await chat.save()
    
            const userMessenger = await Messenger.findOne({ user: req.user.id })
            const recipientMessenger = await Messenger.findOne({ user: req.params.id })
    
    
            await userMessenger.chats.unshift(chat._id)
            await recipientMessenger.chats.unshift(chat._id)
            await userMessenger.save()
            await recipientMessenger.save()
        }
    
    
        await invite.save()
        await recipient.invite.messages.unshift( invite._id )
        await recipient.save()
    
        return res.json({ success: true, message:'Invitation sent.', invite })
    
    })

    getInvites = asyncHandler( async(req, res, next) => {
    
        const invites = await Invite.find({ recipient: req.user.id}).populate('user = recipient', ['name', 'avatar']);
        
        if (!invites) {
            return next(new ErrorResponse('Invitation not found.', 404))
        }
    
        return res.json(invites)
    
    })

    getInviteById = asyncHandler( async(req, res, next) => {
    
        const invite = await Invite.findById(req.params.id).populate('user = recipient', ['name', 'avatar']);
        
        if (!invite) {
            return next(new ErrorResponse('Invitation not found.', 404))
        }
        if (invite.user._id !== req.user.id && invite.recipient._id !== req.user.id) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
    
        res.json(invite)
    
    })

    updateInvite = asyncHandler( async(req, res, next) => {
        const { seen, opened, accepted } = req.body;
        let message = '';
    
        let invite = await Invite.findById(req.params.id).populate('user = recipient', ['name', 'avatar'])
        if (!invite) {
            return next(new ErrorResponse('Invitation not found.', 404))
        }
        
        // notification to send feedback message
        const notification = await Notification.findOne({ user: invite.user._id });
        // notification to remove invitation accepted invitation
        const recipient = await Notification.findOne({ user: invite.recipient._id });
    
        if (invite.recipient._id.toString() !== req.user.id) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
    
        
        if (!seen && !opened && !accepted) {
            return next(new ErrorResponse('No option choosed.', 404))
        }
        if (seen) {
            invite.seen = true;
            // message = `${invite.recipient.name} has seen your invitation.`
            await invite.save()
        }
        else if (opened) {
            invite.opened = true;
            // message = `${invite.recipient.name} has opened your invitation.`
            await invite.save()
        }
        else if (accepted) {
            invite.accepted = true;
            message = `${invite.recipient.name} accepted your invitation.`
    
            const friendship = new Friendship({
                users: [
                    invite.user._id,
                    invite.recipient._id
                ],
                text: `Friendship of ${invite.user.name} and ${invite.recipient.name}`
            })
            await friendship.save()
    
            recipient.invite.messages = await recipient.invite.messages.filter(element => element._id !== invite._id)
            
            await recipient.save()
            await invite.remove()
        }
        
    
        if (notification && notification.turn_on && notification.feedback.turn_on && message) {
            await notification.feedback.messages.unshift({ message })
            await notification.save()
        }
        
        return res.json({ success: true, invite })
    
    })

    deleteInvite = asyncHandler( async(req, res, next) => {
    
        let invite = await Invite.findById(req.params.id).populate('user = recipient', ['name', 'avatar']);
        
        if ( !invite ) {
            invite = await Invite.findOne({ user: req.user.id, recipient: req.params.id }).populate('user = recipient', ['name', 'avatar']);
            
        }
        let message = '';
        
        if (!invite) {
            return next(new ErrorResponse('Invitation not found.', 404))
        }
        if (invite.user._id.toString() !== req.user.id.toString() && invite.recipient._id.toString() !== req.user.id.toString() ) {
            return next(new ErrorResponse('User not authorized', 401))
        }
    
        let notification = await Notification.findOne({user: invite.user._id});
    
        let recipient = await Notification.findOne({user: invite.recipient._id});
        
        if (req.user.id.toString() === invite.user._id.toString() && recipient && recipient.turn_on && recipient.feedback.turn_on) {
            await recipient.feedback.messages.unshift({ message: `Invitation with ${invite.user.name} removed.` })
        }
        if(req.user.id.toString() === invite.recipient._id.toString() && notification && notification.turn_on && notification.feedback.turn_on) {
            await notification.feedback.messages.unshift({ message: `Invitation with ${invite.recipient.name} removed.` })
            await notification.save()
        }
        
        if (recipient) {
            
            recipient.invite.messages = await recipient.invite.messages.filter(message => message._id.toString() !== invite._id.toString())
            await recipient.save()
        }
        
        await invite.remove()
    
        message = 'Invitation removed.'
        
        return res.json({ success: true, message })
    
    })

}

module.exports = InviteController;