const asyncHandler = require("../../middleware/async");
const About = require("../../models/About");
const User = require("../../models/User");
const ErrorResponse = require("../../tools/ErrorResponse");



class RecipientController {


    getRecipients = asyncHandler( async(req, res, next) => {

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return next(new ErrorResponse('User not authorised.', 401))
        }
        const recipients = await User.find();
        
        return res.json(recipients)
    
    })

    getRecipientById = asyncHandler( async(req, res, next) => {

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return next(new ErrorResponse('User not authorised.', 401))
        }
        const recipient = await User.findById(req.params.id).select('-password');
    
        const about = await About.findOne({ user: recipient._id});
    
        return res.json({ recipient, about })
    
    })
}

module.exports = RecipientController;