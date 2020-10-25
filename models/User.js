const mongoose = require('mongoose');

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
module.exports = User = mongoose.model('user', UserSchema)