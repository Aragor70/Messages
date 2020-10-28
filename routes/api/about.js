const express = require('express');
const { check, validationResult } = require('express-validator');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');
const About = require('../../models/About');
const ErrorResponse = require('../../tools/errorResponse');
const router = express.Router();

router.put('/', auth, asyncHandler( async(req, res, next) => {
    
    const { age, gender, status } = req.body;

    const about = await About.findOne({ user: req.user.id })

    if (!about) {
        return next(new ErrorResponse('User not authorized.', 401))
    }

    if (age) about.age = age;
    if (gender) about.gender = gender;
    if (status) about.status = status;
    
    
}))

router.put('/social', auth, asyncHandler( async(req, res, next) => {
    
    const { youtube, twitter, linkedin, facebook, instagram } = req.body;

    const about = await About.findOne({ user: req.user.id });

    if (!about) {
        return next(new ErrorResponse('User not authorized.', 401))
    }

    if (youtube) about.social.youtube = youtube
    if (twitter) about.social.twitter = twitter
    if (linkedin) about.social.linkedin = linkedin
    if (facebook) about.social.facebook = facebook
    if (instagram) about.social.instagram = instagram
    
    await about.save()
    res.json(about)

}))
module.exports = router;