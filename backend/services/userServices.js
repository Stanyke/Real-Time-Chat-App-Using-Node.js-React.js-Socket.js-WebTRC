const User = require('../models/user');
const short = require('short-uuid');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require('../bin/config');
const {appResponse} = require("../utils/appResponse");

class userService{

    pingMe = async () => {
        return {"data": {"success": true, "message": 'Pinged'}, "statusCode": 200}
    }

    verifyAuthToken = async (token) => {
        try{
            const decode = await jwt.verify(token, jwtSecret);
            const user = await this.getUserById(decode._id);
            return appResponse(200, 'Auth successful', {user, token, authVerified: true});
        } catch (err) {
            const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
            if (errors.includes(err?.name)) {
                return appResponse(401, "Invalid token, try logging in again", {authVerified: false});
            }
            return appResponse(500);
        }
	}

    getUserById = async (id) => {
        const user = await User.findById(id, '-__v');
        if(user){
            delete user.password;
        }
        return user;
    }

    getUserByUsername = async (username) => {
        const user = await User.findOne({username}, '-__v');
        if(user){
            delete user.password;
        }
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

                const token = await user.generateToken();
                return appResponse(200, 'Login successful', {user, token});
            }

            const newUser = new User(data);
            await newUser.save();
            user = await this.getUserByUsername(username);

            const token = await user.generateToken();
            return appResponse(200, 'Login successful', {user, token});
        }
        catch(err){
            return appResponse(500);
        }
    }
}

module.exports = userService