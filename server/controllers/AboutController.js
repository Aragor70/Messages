const asyncHandler = require("../middleware/async");
const About = require("../models/About");
const ErrorResponse = require("../tools/ErrorResponse");


class AboutController {


    getAbout = asyncHandler( async(req, res, next) => {

        const about = await About.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    
        if (!about) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
        
        return res.json(about)
    })

    getRecipientAbout = asyncHandler( async(req, res, next) => {

        const about = await About.findOne({ user: req.params.id }).populate('user', ['name', 'avatar']);
    
        if (!about) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
        
        return res.json(about)
    })

    updateDetails = asyncHandler( async(req, res, next) => {
    
        const { age, gender, status } = req.body;
    
        const about = await About.findOne({ user: req.user.id })
    
        if (!about) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
    
        if (status) about.status = status;
        if (age) about.age = age;
        if (gender) about.gender = gender;
        
        
        await about.save()
    
        return res.json({ success: true, about })
    })

    updateSocialMedia = asyncHandler( async(req, res, next) => {
    
        const { youtube, twitter, linkedin, facebook, instagram } = req.body;
    
        const about = await About.findOne({ user: req.user.id });
    
        if (!about) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
    
        if (youtube) about.social.youtube = youtube
        if (twitter) about.social.twitter = twitter
        if (linkedin) about.social.linkedin = linkedin
        if (facebook) about.social.facebook = facebook
        if (instagram) about.social.instagram = instagram
        
        await about.save();

        return res.json({ success: true, about });
    
    })

    deleteSingleSocialMedia = asyncHandler( async(req, res, next) => {
    
        const { value } = req.params;
    
        const about = await About.findOne({ user: req.user.id });
    
        if (!about) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
    
        if (value === "youtube") about.social.youtube = null
        if (value === "twitter") about.social.twitter = null
        if (value === "linkedin") about.social.linkedin = null
        if (value === "facebook") about.social.facebook = null
        if (value === "instagram") about.social.instagram = null
        
        await about.save();

        return res.json({ success: true, about });
    
    })

    deleteAboutDetails = asyncHandler( async(req, res, next) => {
    
        const about = await About.findOne({ user: req.user.id })
    
        if (!about) {
            return next(new ErrorResponse('User not authorized.', 401))
        }
    
        about.age = '';
        about.gender = '';
        about.status = '';
        about.social = [];
    
        await about.save();
    
        return res.json({ success: true, about });
        
    })
    
}

module.exports = AboutController;