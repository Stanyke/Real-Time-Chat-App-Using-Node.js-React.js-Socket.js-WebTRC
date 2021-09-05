const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const {localPort, sessionTimeOut, SessionSecretKey} = require('./utils/config');
const socket = require('./socket');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const sessionInit = sessions({
    secret: SessionSecretKey,
    saveUninitialized: true,
    cookie: { maxAge: sessionTimeOut },
    resave: false
});

app.use(sessionInit);
app.use(cookieParser());

socket.use(sessionInit);
socket.use(cookieParser());

const port = process.env.PORT || localPort;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

module.exports = { server }