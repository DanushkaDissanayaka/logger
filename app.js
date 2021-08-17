const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const server = require('http').Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: 'null',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

/* setup socket.io */
app.use(function (req, res, next) {
    req.io = io;
    next();
});

// Store user token id or something if need
io.sockets.on('connection', function (socket) {
    console.log("User connected");
    socket.on('join', function (data) {
        socket.join(data.email); // We are using room of socket io
    });
});

// Api Points
const api = require('./routes/api')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

// Use api module
app.use('/api', api);

app.use((req, res, next) => {
    const error = new Error('Not Founnd');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = server;

