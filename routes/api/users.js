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
    check('email', 'E-mail address is not valid.')
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
    const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1)

    user = new User({
        name: nameUpperCase,
        email: email,
        avatar: avatar,
        password: password
    })
    // initial profile
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
    
    
    res.json({ success: true, user })

}))

//route PUT    api/users
//description  edit user account
//access       private
router.put('/', [auth, [
    check('password', 'Enter user password.')
    .not()
    .isEmpty(),
    check('newPassword', 'Enter valid password.')
    .optional()
    .isLength({ min: 6 }),
    check('email', 'E-mail address is not valid.')
    .optional()
    .isEmail()
]], asyncHandler( async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(errors.array()[0].msg, 422))
    }
    const { name, email, password } = req.body;
    let user = await User.findById(req.user.id);
    if (!user) {
        return next(new ErrorResponse('Invalid credentials.', 422))
    }
    const isMatch = bcrypt.compare(password, user.password)
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials.', 422))
    }

    if (email) {
        user.email = email
        await user.save()
        return res.json({ success: true, message: 'E-mail address changed.', user })
    }

    if (name && name.toString().length >= 2 && name.toString().length <= 22) {
        const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1)
        user.name = nameUpperCase;
        await user.save()
        return res.json({ success: true, message: 'User name changed.', user })
    } else if (name && (name.toString().length < 2 || name.toString().length > 22)) {
        return next(new ErrorResponse('Enter valid name (2-22 characters).', 422))
    }

    return res.json({ success: false, message: 'Please try again' })
}))


module.exports = router;