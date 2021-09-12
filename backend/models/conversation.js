const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
    isGroup: { type: Boolean },
}, { timestamps: true});

const Conversation = module.exports = mongoose.model('Conversation', ConversationSchema);