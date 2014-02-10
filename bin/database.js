 var mongoose = require('mongoose');

exports.connect = function ( server, done ) {
    console.log('Connecting to database');

    mongoose.connect(server);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database connection error. Server not started'));
    db.once('open', function callback () {
        console.log('Connected to db.');
        done();
    });
}