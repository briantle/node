require('dotenv').config();

const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const PORT = process.env.PORT;

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('entered message', (msg) => {
        io.emit('passing message', msg);
    })

    socket.on('new user', (user) => {
        io.emit('update users', user);
    })
});

server.listen(PORT, () => console.log('Server Started on PORT ' + PORT));