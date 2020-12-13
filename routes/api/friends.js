const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');
const Friendship = require('../../models/Friendship');
const User = require('../../models/User');
const ErrorResponse = require('../../tools/errorResponse');
const router = express.Router();


//route GET    api/friends
//description  get friendships
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    const friendships = await Friendship.find({ "users": { _id: req.user.id } }).populate('user = users', ['name', 'avatar']);
    if (!friendships) {
        return next(new ErrorResponse('Friendship not found.', 404));
    }

    res.json(friendships)
}));

//route GET    api/friends/users
//description  get friends
//access       private
router.get('/users', auth, asyncHandler( async(req, res, next) => {
    let users = await User.find();
    
    const friendships = await Friendship.find({ "users": { _id: req.user.id } }).populate('user = users', ['name', 'avatar']);
    if (!friendships) {
        return next(new ErrorResponse('Friendship not found.', 404));
    }
    const friends = await friendships.map(friendship => {
        let users = friendship.users
        return users.filter(user => user._id !== req.user._id)[0]
    })
        
        
    
    
    res.json(friends)
}));

//route GET    api/friends/unknowns
//description  get no friends
//access       private
router.get('/unknowns', auth, asyncHandler( async(req, res, next) => {
    
    const friendships = await Friendship.find({ "users": { _id: req.user.id } }).populate('user = users', ['name', 'avatar']);
    if (!friendships) {
        return next(new ErrorResponse('Friendship not found.', 404));
    }
    const friends = friendships.map(friendship => {
        let users = friendship.users
        
        return users.filter(user => user._id !== req.user._id)[0]
    });
    
    const users = await User.find();    

    const fIds = await friends.map(user => JSON.stringify(user._id))
    
    const recipients = users.filter(user => !fIds.includes(JSON.stringify(user._id)) && JSON.stringify(user._id) !== JSON.stringify(req.user._id))

    res.json(recipients)
}));

//route GET    api/friends/:id
//description  get friendship by id
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {
    const friendship = await Friendship.findById(req.params.id).populate('users = user', ['name', 'avatar']);
    if (!friendship) {
        return next(new ErrorResponse('Friendship not found.', 404));
    }

    res.json(friendship)
}));


//route PUT    api/friends/:id
//description  set type of friendship by id
//access       private
router.put('/:id', [auth, [
    check('type', 'Please enter valid Type.')
    .isString()
]], asyncHandler( async(req, res, next) => {
    const { type } = req.body
    const friendship = await Friendship.findById(req.params.id).populate('users = user', ['name', 'avatar']);
    if (!friendship) {
        return next(new ErrorResponse('Friendship not found.', 404));
    }
    if (!type) {
        return next(new ErrorResponse('Please enter Type.', 404))
    }
    const textUpperCase = type.charAt(0).toUpperCase() + type.slice(1);
    
    friendship.text = textUpperCase;
    
    await friendship.save()

    res.json(friendship)
}));


//route DELETE api/friends/:id
//description  delete friendship
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    const friendship = await Friendship.findById( req.params.id );
    if (!friendship) {
        return next(new ErrorResponse('Friendship not found.', 404));
    }
    const isMatch = friendship.users.filter(id=> id.toString() === req.user.id)
    if (!isMatch[0]) {
        return next(new ErrorResponse('User not authorized.', 404));
    }
    
    await friendship.remove()

    res.json({ success: true, message: 'Friendship removed.'})
}));
module.exports = router;