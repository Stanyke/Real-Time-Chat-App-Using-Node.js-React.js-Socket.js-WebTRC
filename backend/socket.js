const app = require('./index');
const server = require('http').createServer(app);
const short = require('short-uuid');

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: '*'
    }
});

io.on('connection', (socket) => {
    console.log('User just connected')

    socket.emit('userLogin', {id: short.generate()});
    
    socket.on('userLogin', (data) => {
        console.log('sssssssssssssss', data)
    });
});

module.exports = {io, server};