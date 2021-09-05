const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const {localPort, sessionTimeOut, SessionSecretKey} = require('./utils/config');
const {io, server} = require('./socket');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const sessionInit = sessions({
    secret: SessionSecretKey,
    saveUninitialized: true,
    cookie: { maxAge: sessionTimeOut },
    resave: false
});

// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

app.use(sessionInit);
app.use(cookieParser());

// io.use(wrap(sessionInit));
// io.use(cookieParser());

app.get('/', (req, res) => {
    return res.send({ express: 'Hello From Express' });
});

const port = process.env.PORT || localPort;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

module.exports = app;