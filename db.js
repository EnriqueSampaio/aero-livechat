var aerospike = require('aerospike');

var client = aerospike.client({
    hosts: [{ addr: '127.0.0.1', port: 3000}]
});

exports.connect = function(callback) {
    client.connect(function(response) {
        return callback(response);
    });
};

exports.exists = function(key, callback) {
    client.exists(key, function(error, metadata, key) {
        return callback(error);
    });
};

exports.store = function(key, rec, callback) {
    client.put(key, rec, function(error) {
        return callback(error);
    });
};
