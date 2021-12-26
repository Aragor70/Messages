const asyncHandler = require("../../middleware/async");

const { validationResult } = require('express-validator');
const ErrorResponse = require("../../tools/ErrorResponse");
const User = require("../../models/User");
const gravatar = require('gravatar');
const About = require("../../models/About");
const Notification = require("../../models/Notification");
const Messenger = require("../../models/Messenger");
const bcrypt = require('bcryptjs');

const AuthController = require("../auth/AuthController");

const authController = new AuthController;

class UserController {

    register = asyncHandler( async(req, res, next) => {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
    
        const {name, email, password, passwordConfirmation} = req.body;
    
        if (password !== passwordConfirmation) {
            return next(new ErrorResponse(`Passwords are not equal.`, 422))
        }
    
        let user = await User.findOne({ email })
        
        if( user ) {
            return next(new ErrorResponse(`E-mail already exists.`, 422) )
        }
        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
        const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1)
    
        user = new User({
            name: nameUpperCase,
            email: email,
            avatar: avatar,
            password: password
        })
        // initial the section about
        new About({
            user: user._id
        }).save()
        // initial notification
        new Notification({
            user: user._id
        }).save()
        new Messenger({
            user: user._id
        }).save()
        
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
    
        await user.save()
        
        return authController.sign_in(user, 200, res)
    
    })

    updateUser = asyncHandler( async(req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
        const { status, two_factor, name, email, password, new_password } = req.body;
    
        
        let user = await User.findById(req.user.id);
        if (!user) {
            return next(new ErrorResponse('Invalid credentials.', 422))
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials.', 422))
        }
        if (new_password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(new_password, salt)
            await user.save()
            return res.json({ success: true, message: 'Password changed.', user })
        }
    
        if (two_factor) {
            user.two_factor = !user.two_factor
            await user.save()
            return res.json({ success: true, message: 'Authentication method changed.', user })
        }
    
        if (email) {
            user.email = email
            await user.save()
            return res.json({ success: true, message: 'E-mail address changed.', user })
        }
    
        if (status) {
            user.status = status;
            await user.save()
            return res.json({ success: true, message: 'Status changed.', user })
        }
    
        if (name && name.toString().length >= 2 && name.toString().length <= 22) {
            const nameUpperCase = await name.charAt(0).toUpperCase() + name.slice(1)
            user.name = nameUpperCase;
            await user.save()
            return res.json({ success: true, message: 'User name changed.', user })
        } else if (name && (name.toString().length < 2 || name.toString().length > 22)) {
            return next(new ErrorResponse('Enter valid name (2-22 characters).', 422))
        }
    
        return res.json({ success: false, message: 'Please try again.', user })
    })

    confirmPassword = async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
        const { password } = req.body;
    
        const user = await User.findById(req.user.id)
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials.', 422))
        }
    
        return res.json({ success: true, confirm: true })
    
    }

    deleteUserById = asyncHandler( async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
        const { password } = req.body;
    
        const user = await User.findById(req.user.id)
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials.', 422))
        }
        await user.remove()
    
        
        return res.json({ success: true, message: 'User account deleted.', user })
        
    })

    deleteUser = asyncHandler( async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorResponse(errors.array()[0].msg, 422))
        }
    
        const user = await User.findById(req.user.id).select('-password')
    
        
        if (user.role !== "Admin" || user._id !== process.env.SERVICE_ID ) {
            return next(new ErrorResponse('User not authorized.', 401));
        }
    
        const user_to_delete = await User.findById(req.params.id)
    
        await user_to_delete.remove()
    
        
        return res.json({ success: true, message: `Deleted user ${user.name} with role - ${user.role}.`, user })
        
    })

    getUser = asyncHandler( async(req, res) => {
        
        const user = await User.findById(req.user.id).select('-password')
    
        return res.json(user)
        
    })
    
}

module.exports = UserController;