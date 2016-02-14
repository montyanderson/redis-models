const redis = require("redis");

var rmodels = module.exports = {};
var client;

rmodels.connect = function(options) {
    client = redis.createClient(options);
};

rmodels.model = function(name, schema) {
    var Model = function(_id, input) {
        for(var key in schema) {
            this[key] = input[key];
        }

        this["_id"] = _id;
        this["_key"] = name + ":" + _id;
    };

    Model.find = function(_id, callback) {
        client.hgetall(name + ":" + _id, function(err, data) {
            if(err) return callback(err);
            callback(null, new Model(_id, data));
        });
    };

    Model.prototype.save = function(callback) {
        var query = [this["_key"]];

        for(var key in schema) {
            if(this[key]) {
                query.push(key);
                query.push(this[key]);
            }
        }

        client.hmset(query, callback);
    };

    return Model;
};
