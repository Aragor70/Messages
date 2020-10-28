
const mongoose = require('mongoose');
const ErrorResponse = require('../tools/errorResponse');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 22
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6
    },
    reset_password_token: String,
    reset_password_expire: String,
    two_factor: {
        type: Boolean,
        default: false
    },
    two_factor_key: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})


UserSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}
module.exports = User = mongoose.model('user', UserSchema);