const {io} = require('./index');
const short = require('short-uuid');

io.on('connection', (socket) => {
    console.log('User just connected')

    socket.emit('userLogin', {id: short.generate()});
    
    socket.on('userLogin', (data) => {
        console.log('sssssssssssssss', data)
    });
});

module.exports = io;