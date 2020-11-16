const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');
const ErrorResponse = require('../../../tools/errorResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sign_in = require('./sing_in');
const sgMail = require('@sendgrid/mail');

//route GET    api/auth
//description  user route
//access       private
router.get('/', auth, asyncHandler( async(req, res) => {
    const user = await User.findById(req.user.id).select('-password')

    res.json(user)
    
}))

//route POST   api/auth
//description  login user
//access       public
router.post('/', [
    check('email', 'E-mail address is not valid.')
    .isEmail(),
    check('password', 'Please enter your password.')
    .not()
    .isEmpty()
], asyncHandler( async(req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(errors.array()[0].msg, 422))
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if ( !user ) {
        return next(new ErrorResponse('Invalid credentials', 422))
    }
    
    const isMatch = bcrypt.compare(password, user.password);
    if ( !isMatch ) {
        return ErrorResponse('Invalid credentials', 422)
    }

    if (user.two_factor) {
        
        /////
        sgMail.setApiKey(process.env.SENGRID_KEY);

        const twoFactorKey = await user.getTwoFactorKey()

        const address = `${req.protocol}://${req.get('host')}/two_factors/${user._id}?key=${twoFactorKey}`; // <- create token insted of user._id

        const message = `
            Welcome again ${user.name}, please click the button to log in the webSite. \n\n
            ${address}\n\n
            , or paste you two factor key to the browser. \n\n
            ${twoFactorKey}\n\n

            I am glad to see you again. \n\n

            Mikolaj from onLoud.uk

        `;

        const msg = {
            from: process.env.SENGRID_EMAIL,
            to: user.email,
            subject: 'Messages.com - Authorization Process',
            text: message
        }
        await user.save()
        await sgMail.send(msg)
        
        return res.json({user: user})

    } else if (!user.two_factor) {
        return sign_in(user, 200, res)
    }

    

}));

//route GET    api/auth
//description  logout user
//access       private
router.get('/logout', auth, asyncHandler( async(req, res, next) => {
    const user = await User.findById(req.user.id);
    
    const options = {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true
    }
    res.cookie('token', 'none', options);


    res.json({ success: true, message: `${user.name} User logged out.` })
}))

module.exports = router;