const Conversation = require("../models/conversation");
const ConversationUser = require("../models/conversation_user");
const Message = require("../models/message");

const getUserConversation = async (userId) => {
  try {
    const conversations = await ConversationUser.find({ userId }, "-__v");
    if (conversations.length) {
      return await conversations.forEach(async (convo) => {
        const convoDetails = await Conversation.findOne({
          _id: convo.conversationId,
        }, "-__v");
        const messages = await Message.find({
          conversationId: convo.conversationId,
        }, "-__v");
        const dataToReturn = {
          conversation: convoDetails,
          messages,
        };
        return dataToReturn;
      });
    }
    return [];
  } catch (err) {
    return err;
  }
};

const searchConversation = async (options) => {
  try {
    const { search, user_id } = options;
    const query = search.toLowerCase();
    const chats = await getUserConversation(user_id);
    if (chats.length) {
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
};

const getDuplicateIdsInArrayOfObject = async (arr) => {
    return await arr.map(e => e['conversationId'])
    .map((e, i, final) => final.indexOf(e) !== i && i)
    .filter(obj => arr[obj])
    .map(e => arr[e]["conversationId"]);
}

const filterUserConversation = async (userId, other_user_id, currentUserConversations) => {
  try {
    const otherUserConversations = await ConversationUser.find({userId: other_user_id}, "-__v");
    const bothUsersCnversations = await [...currentUserConversations, ...otherUserConversations];

    const duplicateIds = await getDuplicateIdsInArrayOfObject(bothUsersCnversations);

    if (duplicateIds.length) {
        return await duplicateIds.forEach(async (convoId) => {
        const convoDetails = await Conversation.findOne({
          _id: convoId,
        }, "-__v");
        const messages = await Message.find({
          conversationId: convoId,
        }, "-__v");
        const dataToReturn = {
          conversation: convoDetails,
          messages,
        };
        return dataToReturn;
      });
    }
    return {};
  } catch (err) {
    return err;
  }
};

module.exports = {
  getUserConversation,
  searchConversation,
  filterUserConversation
};
