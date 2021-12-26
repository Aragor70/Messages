const asyncHandler = require("../../middleware/async");
const User = require("../../models/User");

const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
const { validationResult } = require('express-validator');
const ErrorResponse = require("../../tools/ErrorResponse");


class AuthController {

    getUserById = asyncHandler( async(req, res) => {
        const user = await User.findById(req.user.id).select('-password')
    
        res.json(user)
        
    });

    login = asyncHandler( async(req, res, next) => {
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if ( !user ) {
            return next(new ErrorResponse('Invalid credentials', 422))
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if ( !isMatch ) {
            return next(new ErrorResponse('Invalid credentials', 422))
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
            return this.sign_in(user, 200, res)
        }
    
    })

    sign_in = async(user, status, res) => {

        const token = user.getSignedToken()
        
        if ( !token ) {
            return ErrorResponse('Authorization error.', 422)
        }
    
        const options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE * 24 * 60 * 60 * 1000), // 30 * 1 day
            httpOnly: true
        }
        if (process.env.NODE_ENV === 'production') {
            options.secure = true;
        }
        user.status = "Online"
        await user.save()
    
        res.status(status).cookie('token', token, options).json({ success: true, token, user, message: `Hi ${user.name}.` })
    }

    logout = asyncHandler( async(req, res, next) => {
        const user = await User.findById(req.user.id);
        
        const options = {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true
        }
        res.cookie('token', 'none', options);
    
    
        res.json({ success: true, message: `${user.name} User logged out.` })
    })



}

module.exports = AuthController;