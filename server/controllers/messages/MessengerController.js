const asyncHandler = require("../../middleware/async");
const Messenger = require("../../models/Messenger");
const ErrorResponse = require("../../tools/ErrorResponse");



class MessengerController {


    getOwnMessenger = asyncHandler( async(req, res, next) => {

        const messenger = await Messenger.findOne({ user: req.user.id });
        
        if (!messenger) {
            return next(new ErrorResponse('Messenger not found.', 404))
        }
        
    
        res.json( messenger )
    })

    updateMessenger = asyncHandler( async(req, res, next) => {
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
    })
}

module.exports = MessengerController;