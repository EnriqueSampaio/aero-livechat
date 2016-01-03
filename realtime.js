var bcrypt = require('./bcrypt');

module.exports = function(db, io) {
    io.on('connection', function(socket) {
        io.emit('user connected', 'a user connected :D');

        socket.on('disconnect', function() {
            io.emit('user disconnected', 'user disconnected :\'(');
        });

        socket.on('create account', function(userData) {
            var key = {
                ns: "livechat",
                set: "users",
                key: userData.email
            };


            db.exists(key, function(response) {
                if (response.code !== 0) {
                    bcrypt.cryptPassword(userData.password, function(err, hash) {
                        if (err) {
                            console.log(err);
                        } else {
                            var encryptedPassword = hash;
                        }
                    });

                    var rec = {
                        uid: userData.email,
                        username: userData.username,
                        password: encryptedPassword
                    };

                    db.put(key, rec, function(response) {
                        if (response.code !== 0) {
                            console.log(response.message);
                        }
                    });
                } else {
                    console.log(response.message);
                }
            });
        });

        socket.on('chat message', function(nickname, msg){
            io.emit('chat message', nickname, msg);
        });
    });
};
