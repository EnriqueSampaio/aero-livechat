var aerospike = require('aerospike');

var client = aerospike.client({
    hosts: [{ addr: '127.0.0.1', port: 3000}]
});

exports.connect = function(callback) {
    client.connect(function(response) {
        return callback(response.code);
    });
};
