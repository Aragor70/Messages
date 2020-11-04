const express = require('express');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const Friendship = require('../../../models/Friendship');
const Profile = require('../../../models/Profile');
const ErrorResponse = require('../../../tools/errorResponse');
const router = express.Router();


//route GET    api/profiles/friends
//description  get friends
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {
    const profile = await Profile.findOne( req.user.id ).populate('user', ['name', 'avatar']);
    if (!profile) {
        return next(new ErrorResponse('Profile not found.', 404));
    }
    const friends = profile.friends

    res.json(friends)
}));


//route DELETE api/profiles/friends/:id
//description  delete friendship
//access       private
router.delete('/:id', auth, asyncHandler( async(req, res, next) => {
    const profile = await Profile.findOne( req.user.id ).populate('user', ['name', 'avatar']);
    const friendship = await Friendship.findById( req.params.id );
    if (!profile || !friendship) {
        return next(new ErrorResponse('Profile not found.', 404));
    }
    profile.friends = profile.friends.filter(friend => friend._id.toString() !== req.params.id)
    await friendship.remove()

    await profile.save()
    res.json(profile.friends)
}));
module.exports = router;