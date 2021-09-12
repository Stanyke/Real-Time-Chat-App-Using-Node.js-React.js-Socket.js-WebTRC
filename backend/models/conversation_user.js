const mongoose = require('mongoose');

const ConversationUserSchema = mongoose.Schema({
    conversationId: { type: Schema.Types.ObjectId },
    userId: { type: Boolean, default: false },
}, { timestamps: true});

const ConversationUser = module.exports = mongoose.model('Conversation_User', ConversationUserSchema);