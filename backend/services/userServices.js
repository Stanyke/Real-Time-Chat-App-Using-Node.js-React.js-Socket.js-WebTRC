const User = require('../models/user');
const short = require('short-uuid');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require('../bin/config');
const {appResponse} = require("../utils/appResponse");
const {getUserConversation, searchConversation, filterUserConversation} = require("./conversationServices");
const ConversationUser = require("../models/conversation_user");

class userService{

    pingMe = async () => {
        return {"data": {"success": true, "message": 'Pinged'}, "statusCode": 200}
    }

    decryptToken = async (token) => {
        return await jwt.verify(token, jwtSecret);
    }

    verifyAuthToken = async (token) => {
        try{
            const decode = await this.decryptToken(token);
            const user = await this.getUserById(decode._id);
            await this.updateUserLastSeen(user._id);
            const chats = await getUserConversation(user._id);
            return appResponse(200, 'Auth successful', {user, token, authVerified: true, chats});
        } catch (err) {
            console.log(err)
            const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
            if (errors.includes(err?.name)) {
                return appResponse(401, "Invalid token, try logging in again", {authVerified: false});
            }
            return appResponse(500);
        }
	}

    getUserById = async (id) => {
        const user = await User.findById(id, '-__v -password');
        return user;
    }

    getUserByUsername = async (username) => {
        const user = await User.findOne({username}, '-__v');
        return user;
    }

    userLogin = async (data) => {
        try{
            let {username, password} = data;
            username = username.toLowerCase();
            
            if(!username || !password){
                return appResponse(400, 'Username or password is missing');
            }

            let user = await this.getUserByUsername(username);
            if(user){
                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch){
                    return appResponse(400, 'Invalid credentials');
                }

                await this.updateUserLastSeen(user._id);
                const token = await user.generateToken();
                const chats = await getUserConversation(user._id);
                return appResponse(200, 'Login successful', {user, token, chats});
            }

            const newUser = new User(data);
            await newUser.save();
            user = await this.getUserByUsername(username);
            delete user.password;

            await this.updateUserLastSeen(user._id);
            const token = await user.generateToken();
            const chats = await getUserConversation(user._id);
            return appResponse(200, 'Login successful', {user, token, chats});
        }
        catch(err){
            console.log('2222222222', err)
            return appResponse(500);
        }
    }

    updateUserLastSeen = async (user_id) => {
        await User.findOneAndUpdate(
				{ _id: user_id },
				{ $set: { lastSeen: Date.now() } },
				{ new: true, select: "-__v -createdAt -updatedAt" }
			);
    }

    search = async (options) => {
        const {search, user_id, username} = options;
        const users = await User.find({username: {'$regex' : search, '$options' : 'i'}}, "-__v -password");
        let userData = [];
        const currentUserConversations = await ConversationUser.find({userId: user_id}, "-__v");
        for await(const otherUser of users){
            const obj = await filterUserConversation(user_id, otherUser._id, currentUserConversations);
            obj.otherUser = otherUser;
            if(!obj.conversation || !obj.messages){
                obj.conversation = {},
                obj.messages = []
                userData.push(obj);
            } else {
                userData.push(obj);
            }
        };

        const chats = await searchConversation(options);
        return appResponse(200, 'Search results', {users: userData, chats});
    }
}

module.exports = userService