const asyncHandler = require("../middleware/async");
const Friendship = require("../models/Friendship");
const User = require("../models/User");
const ErrorResponse = require("../tools/ErrorResponse");



class FriendController {

    getFriendships = asyncHandler( async(req, res, next) => {
        const friendships = await Friendship.find({ "users": { _id: req.user.id } }).populate('user = users', ['name', 'avatar']);
        if (!friendships) {
            return next(new ErrorResponse('Friendship not found.', 404));
        }
    
        return res.json(friendships)
    })

    getFriends = asyncHandler( async(req, res, next) => {
        
        const friendships = await Friendship.find({ "users": { _id: req.user.id } }).populate('user = users', ['name', 'avatar']);
        if (!friendships) {
            return next(new ErrorResponse('Friendship not found.', 404));
        }
        const friends = await friendships.map(friendship => {
            let users = friendship.users
            return users.filter(user => JSON.stringify(user._id) != JSON.stringify(req.user._id))[0]
        })
            
    
        return res.json(friends)
    })

    getUnknowns = asyncHandler( async(req, res, next) => {
    
        const friendships = await Friendship.find({ "users": { _id: req.user.id } }).populate('user = users', ['name', 'avatar']);
        if (!friendships) {
            return next(new ErrorResponse('Friendship not found.', 404));
        }
        const friends = await friendships.map(friendship => {
            let users = friendship.users
            
            return users.filter(user => JSON.stringify(user._id) != JSON.stringify(req.user._id))[0]
        });
        
        const users = await User.find();
    
        const fIds = await friends.map(user => JSON.stringify(user._id))
        
        const recipients = await users.filter(user => !fIds.includes(JSON.stringify(user._id)) && JSON.stringify(user._id) !== JSON.stringify(req.user._id))
    
        return res.json(recipients)
    })

    getFriendshipById = asyncHandler( async(req, res, next) => {
        const friendship = await Friendship.findById(req.params.id).populate('users = user', ['name', 'avatar']);
        if (!friendship) {
            return next(new ErrorResponse('Friendship not found.', 404));
        }
    
        return res.json(friendship)
    })

    updateType = asyncHandler( async(req, res, next) => {
        const { type } = req.body
        const friendship = await Friendship.findById(req.params.id).populate('users = user', ['name', 'avatar']);
        if (!friendship) {
            return next(new ErrorResponse('Friendship not found.', 404));
        }
        if (!type) {
            return next(new ErrorResponse('Please enter Type.', 404))
        }
        const textUpperCase = await type.charAt(0).toUpperCase() + type.slice(1);
        
        friendship.text = await textUpperCase;
        
        await friendship.save()
    
        return res.json(friendship)
    })

    deleteFriendship = asyncHandler( async(req, res, next) => {
        const recipient = await User.findById(req.params.id).populate('user', ['name', 'avatar'])
        const friendship = await Friendship.findOne({ "users": { $all: [recipient._id, req.user._id] } });
        
        if (!friendship) {
            return next(new ErrorResponse('Friendship not found.', 404));
        }
        const isMatch = await friendship.users.filter(id => id.toString() === req.user.id)
        if (!isMatch[0]) {
            return next(new ErrorResponse('User not authorized.', 404));
        }
        
        await friendship.remove()
    
        return res.json({ success: true, message: 'Friendship removed.', recipient})
    })
    
}

module.exports = FriendController;