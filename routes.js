module.exports = function(app, express, io) {
    app.use(express.static('public'));

    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/views/login.html');
    });

    app.get('/home', function(req, res) {
        res.sendfile(__dirname + '/views/home.html');
    });
};
