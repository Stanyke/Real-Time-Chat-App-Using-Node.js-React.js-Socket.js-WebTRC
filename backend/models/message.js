const {model, Schema} = require('mongoose');

const MessageSchema = new Schema({
    conversationId: { type: Schema.Types.ObjectId },
    isRead: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    message: { type: String },
    senderId: { type: String },
    isEdited: { type: Boolean, default: false },
}, { timestamps: true});

const Message = module.exports = model('Message', MessageSchema);