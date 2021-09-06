const userRoutes = require('./userRoutes');
module.exports = (router) => {
    router.use('/api', userRoutes())

    return router;
}