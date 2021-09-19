const {io} = require('./index');
const userService = require('./services/userServices');
const userServiceInstance = new userService();

io.on('connection', (socket) => {
    console.log('User just connected')

    
    socket.on('login', async (data) => {
        const response = await userServiceInstance.userLogin(data);
        socket.emit('user', response.data);
        response.data.success && socket.emit('userOnline', response.data)
    });

    socket.on('authenticateUser', async (token) => {
        const response = await userServiceInstance.verifyAuthToken(token);
        socket.emit('user', response.data);
        response.data.success && socket.emit('userOnline', response.data)
    })
});

module.exports = io;