var entity = require('./entity'),
    mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String
});
var model = mongoose.model('places', schema);

exports.setup = function( app ) {
    app.get('/places', list);
    app.get('/places_new', create);

};

function create (req, res){
    var newPlace = new model({ name: 'Best Rest' });
    newPlace.save(function (err, newPlace) {
        if (err) {
            console.log("couldn't save: " + err);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({"done": true}));
    });
}

function list (req, res){

    model.find(function (err, places) {
        if (err) {
            console.log("couldn't save: " + err);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(places));
    });
};