var index = require('./index'),
    user = require('./user');

exports.setup = function( app ) {

    app.get('/', index.list);
    app.get('/users', user.list);

};