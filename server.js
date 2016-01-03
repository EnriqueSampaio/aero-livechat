var IPADDRES = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var app = require('express')();
var db = require('./db');
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var realtime = require('./realtime');
var routes = require('./routes');

db.connect(function(response) {
    if (response.code === 0) {
        console.log("Database Connected");
    } else {
        console.log("Error on database connection");
    }
});

realtime(db, io);
routes(app, express, io);

http.listen(PORT, IPADDRES, function () {
    console.log('linstening on ' + IPADDRES + ':' + PORT);
});
