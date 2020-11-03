const express = require('express');
const auth = require('../../../middleware/auth');
const User = require('../../../models/User');
const ErrorResponse = require('../../../tools/errorResponse');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const asyncHandler = require('../../../middleware/async');



//route PUT    api/users/roles
//description  edit user role
//access       private
router.put('/', [auth, [
    check('role', 'Role not found.')
    .not()
    .isEmpty(),
]], asyncHandler( async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(errors.array()[0].msg, 422))
    }
    const { password, role } = req.body;
    let user = await User.findById(req.user.id);
    if (!user) {
        return next(new ErrorResponse('Invalid credentials.', 422))
    }

    if (role === "Admin") {
        if (password !== process.env.ADMIN_PASSWORD) {
            return next(new ErrorResponse('Invalid credentials.', 422))
        }
        user.role = role
        await user.save()
        return res.json({ success: true, message: `Face the new role - ${user.role}`, user })
    }
    if (role === "User") {
        user.role = role
        await user.save()
        return res.json({ success: true, message: `Face the new role - ${user.role}`, user })
    }
    
    return res.json({ success: false, message: 'Invalid credentials.', user })
}));
module.exports = router;