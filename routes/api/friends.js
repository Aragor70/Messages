const express = require('express');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');
const Friendship = require('../../models/Friendship');
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