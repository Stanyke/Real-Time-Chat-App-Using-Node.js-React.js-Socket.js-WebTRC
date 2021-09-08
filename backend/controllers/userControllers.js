const userService = require('../services/userServices');

module.exports = function userController() {
    const userServiceInstance = new userService();

    //Get ping me
    this.pingMe = async (req, res) => {
        const data = await userServiceInstance.pingMe();
        return res.status(data.statusCode).json(data.data);
    }
}