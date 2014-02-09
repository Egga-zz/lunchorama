var server = require("./server"),
    config  = require('./config'),
    mongoose = require('mongoose'),
    places  = require('../places/controller');


exports.startApp = function( done ) {
    var app = server.create();

    config.setupEnvironment( app );

    server.setupMiddleware( app );
    connectToDatabase( app, function ( app ) {
        setupRoutes( app );
        done( app );
    });
}

function connectToDatabase ( app, done ) {
    console.log('Connecting to database');

    mongoose.connect('mongodb://' + app.get('db-server') +'/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database connection error. Server not started'));
    db.once('open', function callback () {
        console.log('Connected to db.');
        done( app );
    });
}

function setupRoutes( app ) {

    app.get('/', function (req, res) {
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.end('<html><head><title>lunchorama</title></head><body><a href="/places">places</a></body></html>');
    });

    places.setup( app );
}