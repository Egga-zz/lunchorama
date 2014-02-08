var server = require("./bin/server"),
  config  = require('./bin/config'),
  places  = require('./places/controller');

var app = server.create();

config.setupEnvironment( app );

server.setupMiddleware( app );
server.connectToDatabase( app );

app.get('/', function (req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.end('<html><head><title>lunchorama</title></head><body><a href="/places">places</a><br /><a href="/places_new">add place</a></body></html>');
});

places.setup(app);

server.start( app );