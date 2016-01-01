module.exports = function(io) {
    io.on('connection', function(socket) {
        io.emit('user connected', 'a user connected :D');

        socket.on('disconnect', function() {
            io.emit('user disconnected', 'user disconnected :\'(');
        });

        socket.on('chat message', function(nickname, msg){
            io.emit('chat message', nickname, msg);
        });
    });
};
