 exports.setupEnvironment = function( app ) {

    app.set('port', process.env.PORT || 3000);
    app.set('db-server', process.env.IP || 'localhost');
 }