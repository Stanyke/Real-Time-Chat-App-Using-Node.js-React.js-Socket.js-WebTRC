const userController = require('../controllers/userControllers');
const router = require('express').Router();
const {authenticate} = require('../middlewares/authMiddleware');

module.exports = function () {
    const userCtrl = new userController();

    router.get('/ping', userCtrl.pingMe);
    router.get('/chats', authenticate, userCtrl.search);


    return router;
}