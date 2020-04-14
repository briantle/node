require('dotenv').config();

const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const PORT = process.env.PORT;

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('New User Added', (user) => {
        io.emit('Update Users', user);
    })

    socket.on('Client Message', (msg) => {
        io.emit('Server Message', msg);
    })
});

server.listen(PORT, () => console.log('Server Started on PORT ' + PORT));