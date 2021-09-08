const {io} = require('./index');
const userService = require('./services/userServices');
const userServiceInstance = new userService();

io.on('connection', (socket) => {
    console.log('User just connected')
    
    socket.on('login', async (data) => {
        const response = await userServiceInstance.userLogin(data);
        socket.emit('user', response.data);
    });

    socket.on('authenticateUser', async ({token}) => {
        const response = await userServiceInstance.verifyAuthToken(token);

        if(response.data.success){
            socket['user'] = response.data.user.username;
        }
        socket.emit('user', response);
    })
});

module.exports = io;