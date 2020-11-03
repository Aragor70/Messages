const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friendship'
    }]
    
})
module.exports = Profile = mongoose.model('Profile', ProfileSchema);