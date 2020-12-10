const express = require('express');
const asyncHandler = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const Messenger = require('../../../models/Messenger');
const router = express.Router();


//route GET    api/messengers
//description  get own messenger
//access       private
router.get('/', auth, asyncHandler( async(req, res, next) => {

    const messenger = await Messenger.findOne({ user: req.user.id });
    
    if (!messenger) {
        return next(new ErrorResponse('Messenger not found.', 404))
    }
    

    res.json( messenger )
}));


//route PUT    api/messengers
//description  edit own messenger
//access       private
router.put('/', auth, asyncHandler( async(req, res, next) => {
    const { turn_on } = req.body;
    let message = ''
    const messenger = await Messenger.findOne({ user: req.user.id });
    if (!messenger) {
        return next(new ErrorResponse('Messenger not found.', 404))
    }
    if (turn_on) {
        messenger.turn_on = !messenger.turn_on;
        await messenger.save();
        message = `Messages switched ${messenger.turn_on ? 'On' : 'Off'}.`
        
        return res.json({ success: true, message: '' })
    }

    message = 'Please choose the option.'

    res.json({ success: false, message, messenger })
}))
module.exports = router;