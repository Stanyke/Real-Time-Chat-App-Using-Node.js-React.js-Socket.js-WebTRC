const userController = require('../controllers/userControllers');
const router = require('express').Router();

module.exports = function () {
    const userCtrl = new userController();

    router.get('/ping', userCtrl.pingMe);


    return router;
}