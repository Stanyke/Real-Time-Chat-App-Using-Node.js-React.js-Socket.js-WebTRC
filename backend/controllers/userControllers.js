const userService = require('../services/userServices');
const {appResponse} = require("../utils/appResponse");

module.exports = function userController() {
    const userServiceInstance = new userService();

    //Get ping me
    this.pingMe = async (req, res) => {
        const data = await userServiceInstance.pingMe();
        return res.status(data.statusCode).json(data.data);
    }

    this.search = async (req, res) => {
        if(!req.query.search){
            const data = appResponse(400, "Search option is missing from query");
            return res.status(data.statusCode).json(data.data);
        }
        const options = {
            ...req.query, user_id: req.user._id, username: req.user.username
        }
        const data = await userServiceInstance.search(options);
        return res.status(data.statusCode).json(data.data);
    }

    this.getUser = async (req, res) => {
        const { username, id } = req.query;
        let data;
        if(username){
            data = await userServiceInstance.getUserByUsername(username);
        }
        
        if(id){
            data = await userServiceInstance.getUserById(id);
        }

        data = await appResponse(200, 'User fetched', {otherUser: data});
        return res.status(data.statusCode).json(data.data);
    }
}