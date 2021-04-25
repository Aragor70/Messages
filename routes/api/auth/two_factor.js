const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../../../models/User');
const asyncHandler = require('../../../middleware/async');
const ErrorResponse = require('../../../tools/errorResponse');
const router = express.Router();
const sign_in = require('./sing_in');



//route POST   api/auth/two_factor/
//description  post the key from user email address
//access       Public
router.post('/:id', [
    check('key', 'Key is required.')
    .not()
    .isEmpty()
], asyncHandler( async(req, res, next) => {
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

    sign_in(user, 200, res)

}));
module.exports = router;
