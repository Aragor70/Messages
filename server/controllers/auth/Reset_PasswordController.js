
const { validationResult } = require('express-validator');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');
const ErrorResponse = require('../../tools/ErrorResponse');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

class Reset_PasswordController {

    resetPassword = asyncHandler( async(req, res, next) => {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
        const user = await User.findOne({ email: req.body.email });
    
        if(!user) {
            return next(new ErrorResponse('User not found.', 422))
        }
        const resetToken = await user.getResetPasswordToken();
        
        await user.save({ validateBeforeSave: false })
    
        const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
        const message = `
            Hi ${user.name},<br /><br /> 
            You are receiving this email, because you (or someone else) requested to reset of a password. <br /> 
            <b>Please click the address below to reset the password:</b> <br /><br /> 
            ${resetUrl} <br /><br /> 
            If you did not request a password reset, then please ignore this email or reply to let us know. <br />
            This password reset is only valid for the next 10 minutes. <br /><br /> 
            Thank you, <br />
            Messages.com <br />
        `;
    
        sgMail.setApiKey(process.env.SENGRID_KEY);
        const header = {
          to: user.email,
          from: 'messages@gmail.com',
          subject: 'Messages reset password.',
          html: message
        };
        await sgMail.send(header);
    
        res.json('Restart password message sent.')
        
    
    })

    updatePassword = asyncHandler( async(req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
        const { password, passwordConfirmation } = req.body;
    
        if (password !== passwordConfirmation) {
            return next(new ErrorResponse(`Passwords are not equal.`, 422))
        }
    
        const reset_password_token = await crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
    
        let user = await User.findOne({ reset_password_token, reset_password_expire: { $gt:Date.now() }})
        if(!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }
    
        const salt = await bcrypt.genSalt(10)
    
        user.password = await bcrypt.hash(req.body.password, salt);
        user.reset_password_token = undefined;
        user.reset_password_expire = undefined;
    
        await user.save()
        
        return res.json(user)
    
    
    })


}

module.exports = Reset_PasswordController;