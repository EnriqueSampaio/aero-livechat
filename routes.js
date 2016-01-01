module.exports = function(app, io) {
    app.get('/', function (req, res) {
        res.sendfile('index.html');
    });

    app.post('/home/:id', function(req, res) {
        //
    });
};
