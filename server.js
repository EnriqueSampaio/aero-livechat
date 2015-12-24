var IPADDRES = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var aerospike = require('aerospike');
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

var client = aerospike.client({
    hosts: [{ addr: '127.0.0.1', port: 3000}]
}).connect(function(response){
    if (response.code === aerospike.status.AEROSPIKE_OK) {
        console.log('Show!');
    } else {
        console.log('Fuén');
    }
});

app.use(express.static('public'));
app.use(express.static('views'));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    io.emit('user connected', 'a user connected :D');

    socket.on('disconnect', function(){
        io.emit('user disconnected', 'user disconnected :\'(');
    });

    socket.on('chat message', function(nickname, msg){
        io.emit('chat message', nickname, msg);
    });
});

http.listen(PORT, IPADDRES, function (){
    console.log('linstening on ' + IPADDRES + ':' + PORT);
});
