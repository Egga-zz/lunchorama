
var database= require("../bin/database");



var connectionString = 'mongodb://' + process.env.IP +'/test';
database.connect( connectionString, function ( ) {
    var mongoose = require('mongoose')
    require("./entity");
    var fixtures = require('pow-mongoose-fixtures');

        fixtures.load({
            Place: [
                { name: 'Mercan' },
                { name: 'Cicciolina' }
            ]
        });
    });