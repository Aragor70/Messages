
const { validationResult } = require('express-validator');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');
const ErrorResponse = require('../../tools/ErrorResponse');
const AuthController = require('./AuthController');

const authController = new AuthController;

class TwoFactorController {


    confirm = asyncHandler( async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
        const key_password = req.body.key.join(',');
        if (!key_password) {
            return next(new ErrorResponse('Invalid credentials', 422))
        }
    
        const user = await User.findById(req.params.id);
        
        if ( !user ) {
            return next(new ErrorResponse('Invalid credentials', 422))
        }
        if ( key_password.toString() !== user.two_factor_key.toString() ) {
            return next(new ErrorResponse('Invalid credentials', 422))
        }
        
        user.two_factor_key = undefined;
                    
        await user.save()
    
        return authController.sign_in(user, 200, res)
    
    })
}

module.exports = TwoFactorController;