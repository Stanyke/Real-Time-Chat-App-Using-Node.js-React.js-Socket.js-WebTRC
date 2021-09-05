const {server} = require('./');

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        method: '*'
    }
});

io.on('connection', (socket) => {
    console.log('hello')
});

module.exports = io;