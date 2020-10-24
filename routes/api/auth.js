const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const asyncHandler = require('../../middleware/async');
const auth = require('../../middleware/auth');

//route GET    api/auth
//description  test user route
//access       private
router.get('/', auth, asyncHandler( async(req, res) => {
    const users = await User.find().select('-password')

    res.json(users)
    
}))
module.exports = router;