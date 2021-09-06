const userService = require('../services/userServices');

module.exports = function userController() {
    const userServiceInstance = new userService();

    //Get ping me
    this.pingMe = async (req, res) => {
        const data = await userServiceInstance.pingMe();
        return res.status(data.statusCode).json(data.data);
    }

    //Get users from hatchway api
    this.getUsers = async (req, res) => {
        const data = await userServiceInstance.getUsers(req.query);
        return res.status(data.statusCode).json(data.data);
    }
}