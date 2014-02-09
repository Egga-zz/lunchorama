var server = require("./bin/server");


require("./bin/app").startApp( function ( app ) {
    server.start( app );
});

