const userController = require('../controllers/userControllers');
const router = require('express').Router();

module.exports = function () {
    const userCtrl = new userController();

    router.get('/ping', userCtrl.pingMe);
    router.get('/users', userCtrl.getUsers);


    return router;
}