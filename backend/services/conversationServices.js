const Conversation = require("../models/conversation");
const ConversationUser = require("../models/conversation_user");
const Message = require("../models/message");

const getUserConversation = async (userId) => {
    try{
        const conversations = await ConversationUser.find({userId}, '-__v');
        if(conversations.length){
            return await conversations.forEach(async (convo) => {
                const convoDetails = await Conversation.findOne({_id: convo.conversationId});
                const messages = await Message.find({conversationId: convo.conversationId});
                const dataToReturn = {
                    conversationId,
                    conversation: convoDetails,
                    messages
                }
                return dataToReturn;
            });
        }
        return [];
    } catch (err) {
        return err;
    }
}

const searchConversation = async (options) => {
    try{
        const {search, user_id} = options;
        const query = search.toLowerCase();
        const chats = await getUserConversation(user_id);
        if(chats.length) {
            return chats.forEach((chat) => {
                return chat.messages.filter((message) => {
                    return message.message.toString() == search.toString();
                });
            });
        }
        return [];
    } catch (err) {
        return err;
    }
}

module.exports = {
    getUserConversation,
    searchConversation
}