const {model, Schema} = require('mongoose');

const ConversationUserSchema = new Schema({
    conversationId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId },
}, { timestamps: true});

const ConversationUser = module.exports = model('Conversation_User', ConversationUserSchema);