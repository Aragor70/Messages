
const mongoose = require('mongoose');
const ErrorResponse = require('../tools/errorResponse');
const jwt = require('jsonwebtoken');
const generateNumber = require('../tools/generateNumber');

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
    role: {
        type: String,
        default: 'User'
    },
    reset_password_token: String,
    reset_password_expire: String,
    two_factor: {
        type: Boolean,
        default: false
    },
    two_factor_key: Number,
    two_factor_key_expire: String,
    date: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('remove', async function(next) {
    
    console.log('Remove')
    
    await this.model('Notification').deleteMany({ user: this._id})
    await this.model('About').deleteMany({ user: this._id})
    await this.model('Messenger').deleteMany({ user: this._id})
    await this.model('Invite').deleteMany({ user: this._id})
    next();
});

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

UserSchema.methods.getResetPasswordToken = function() {
    // generate token
    let resetToken = crypto.randomBytes(20).toString('hex');

    this.reset_password_token = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set expire
    this.reset_password_expire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

UserSchema.methods.getTwoFactorKey = function() {
    // generate key

    let auth_key = generateNumber(6)

    this.two_factor_key = auth_key;

    // set expire
    this.two_factor_key_expire = Date.now() + 10 * 60 * 1000;
    return auth_key;
}
module.exports = User = mongoose.model('User', UserSchema);