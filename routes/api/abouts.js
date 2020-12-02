const express = require('express');
const { check, validationResult } = require('express-validator');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');
const About = require('../../models/About');
const ErrorResponse = require('../../tools/errorResponse');
const router = express.Router();

//route GET    api/abouts
//description  get about
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {

    const about = await About.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!about) {
        return next(new ErrorResponse('User not authorized.', 401))
    }
    
    res.json(about)
}));

//route PUT    api/abouts
//description  set up about age, gender, status
//access       private
router.put('/', auth, asyncHandler( async(req, res, next) => {
    
    const { age, gender, status } = req.body;

    const about = await About.findOne({ user: req.user.id })

    if (!about) {
        return next(new ErrorResponse('User not authorized.', 401))
    }

    if (status) about.status = status;
    if (age) about.age = age;
    if (gender) about.gender = gender;
    
    
    await about.save()

    res.json({ success: true, about })
}));

//route PUT    api/abouts/social
//description  set up about social media
//access       private
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
    res.json({ success: true, about })

}));

//route DELETE api/abouts
//description  empty about details
//access       private
router.delete('/', auth, asyncHandler( async(req, res, next) => {
    
    const about = await About.findOne({ user: req.user.id })

    if (!about) {
        return next(new ErrorResponse('User not authorized.', 401))
    }

    about.age = '';
    about.gender = '';
    about.status = '';
    about.social = [];

    await about.save();

    res.json({ success: true, about })
}));
module.exports = router;