var server = require("./server"),
    config  = require('./config'),
    database= require("./database"),
    places  = require('../places/controller');


exports.startApp = function( done ) {
    var app = server.create();

    config.setupEnvironment( app );

    server.setupMiddleware( app );

    var connectionString = 'mongodb://' + app.get('db-server') +'/test';
    database.connect( connectionString , function ( ) {
        setupRoutes( app );
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