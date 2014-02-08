var express = require('express'),
  http = require('http'),
  helmet = require('helmet'),
  mongoose = require('mongoose')
;

exports.create = function() {
    return express();
}

exports.connectToDatabase = function( app ) {
    console.log('Connecting to database');

    mongoose.connect('mongodb://' + app.get('db-server') +'/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database connection error. Server not started'));
    db.once('open', function callback () {
        console.log('Connected to db.');
    });
}

exports.setupMiddleware = function( app ) {

    app.disable('x-powered-by');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    //app.use(helmet.xframe());
    //app.use(helmet.iexss());
    //app.use(helmet.contentTypeOptions());
    //app.use(helmet.cacheControl());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('optional secret string'));
    app.use(express.session({
      secret: 'keyboard cat',
      key: 'sid',
      //cookie: {httpOnly: true, secure: true}
      cookie: {httpOnly: true}
    }));
    app.use(express.csrf());
    app.use(function (req, res, next) {
      res.locals.csrftoken = req.csrfToken();
      next();
    });
    app.use(express.static(__dirname + '/public', {maxAge: 60000}));  // 1min
    app.use(express.compress());
    app.use(app.router);

    // development only
    if ('development' == app.get('env')){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    }
};

exports.start = function( app ) {

    http.createServer(app).listen(app.get('port'), function(){
      console.log("Express server listening on port %d in mode %s", app.get('port'), app.get('env'));
      //process.setuid(config.uid);
      //process.setgid(config.gid);
    });
};
