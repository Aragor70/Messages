const express = require('express');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');
const ErrorResponse = require('../../../tools/errorResponse');
const router = express.Router();

//route GET    api/profiles
//description  get user profile
//access       private
router.get('/me', auth, asyncHandler( async(req, res, next) => {
    const profile = await Profile.findOne( req.user.id ).populate('user', ['name', 'avatar']);
    if (!profile) {
        return next(new ErrorResponse('Profile not found.', 404));
    }
    res.json(profile)
}))
module.exports = router;
