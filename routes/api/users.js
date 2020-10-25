const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../tools/errorResponse');
const auth = require('../../middleware/auth');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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

    user = new User({
        name: name,
        email: email,
        avatar: gravatar.url(email, {s: '200', r: 'pg', d: 'mm'}),
        password: password
    })

    const salt = bcrypt.genSalt(10)
    user.password = bcrypt.hash(password, salt)

    await user.save()
    res.json(user)

}))
module.exports = router;