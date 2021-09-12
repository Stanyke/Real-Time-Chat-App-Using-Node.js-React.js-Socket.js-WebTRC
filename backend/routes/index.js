const userRoutes = require('./userRoutes');
module.exports = (router) => {
    router.use('/api/v1/', userRoutes())

    return router;
}