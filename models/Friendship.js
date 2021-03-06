const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    text: {
        type: String,
        default: "Friend"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Friendship = mongoose.model('Friendship', FriendshipSchema);