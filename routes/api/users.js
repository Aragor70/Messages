const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../tools/errorResponse');
const auth = require('../../middleware/auth');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const Profile = require('../../models/Profile');
const Notification = require('../../models/Notification');
const About = require('../../models/About');

//route POST   api/users
//description  register new user
//access       public
router.post('/', [
    check('name', 'Name is required.')
    .isLength({ min: 2, max: 22 })
    .isString(),
    check('email', 'E-mail is not valid.')
    .isEmail(),
    check('password', 'Password is required.')
    .isLength({ min: 6 })
], asyncHandler( async(req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(errors.array()[0].msg, 422))
    }

    const {name, email, password, passwordConfirmation} = req.body;

    if (password !== passwordConfirmation) {
        return next(new ErrorResponse(`Passwords are not equal.`, 422))
    }

    let user = await User.findOne({ email })
    
    if( user ) {
        return next(new ErrorResponse(`E-mail already exists.`, 422) )
    }
    const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
    
    user = new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password,
        
    })
    // initial  profile
    new Profile({
        user: user._id
    }).save()
    // initial the section about
    new About({
        user: user._id
    }).save()
    // initial notification
    new Notification({
        user: user._id
    }).save()
    
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()
    
    
    res.json(user)

}))
module.exports = router;