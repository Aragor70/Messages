const express = require('express');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const About = require('../../../models/About');
const User = require('../../../models/User');
const ErrorResponse = require('../../../tools/ErrorResponse');
const router = express.Router();

//route GET    api/recipients
//description  get all recipients
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return next(new ErrorResponse('User not authorised.', 401))
    }
    const recipients = await User.find();
    
    res.json(recipients)

}));

//route GET    api/recipients
//description  recipient account
//access       private
router.get('/:id', auth, asyncHandler( async(req, res, next) => {

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return next(new ErrorResponse('User not authorised.', 401))
    }
    const recipient = await User.findById(req.params.id).select('-password');

    const about = await About.findOne({ user: recipient._id});

    res.json({ recipient, about })

}))

module.exports = router;