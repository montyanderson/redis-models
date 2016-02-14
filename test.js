var rmodels = require("./");
var mongoose = require("mongoose");

rmodels.connect();


var User = rmodels.model("user", {
    username: String,
    password: String,
    age: Number
});

/*

var john = new User("john", {
    password: "hisdfsdf",
    age: 19
});

console.log(john);

john.save(function(err, rep) {
    console.log(err || rep);
});
*/

User.find("john", function(err, data) {
    console.log(err || data);
});
