const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seen: {
        type: Boolean,
        default: false
    },
    opened: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Service = mongoose.model('Service', ServiceSchema);