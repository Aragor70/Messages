const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const ErrorResponse = require('../../tools/errorResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//route GET    api/auth
//description  test user route
//access       private
router.get('/', auth, asyncHandler( async(req, res) => {
    const users = await User.find().select('-password')

    res.json(users)
    
}))

//route POST   api/auth
//description  login user
//access       public
router.post('/', [
    check('email', 'E-mail is not valid.')
    .isEmail(),
    check('password', 'Password is required.')
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
        return next(new ErrorResponse(`Invalid credentials`, 422))
    }
    
    const isMatch = bcrypt.compare(password, user.password);
    if ( !isMatch ) {
        return ErrorResponse('Invalid credentials', 422)
    }
    const payload = {
        user: {
            id: user.id
        }
    }
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, 
    (err, token) => {
        if (err) {
            return next(new ErrorResponse(err.message, 422))
        }
        
        res.json({ token })
    })

}))
module.exports = router;