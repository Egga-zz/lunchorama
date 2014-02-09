var entity = require('./entity'),
    mongoose = require('mongoose');

var placesSchema = mongoose.Schema({
    name: String
});
var Place = mongoose.model('places', placesSchema);

exports.setup = function( app ) {
    app.get('/places', list);

};

function list (req, res){

    Place.find(function (err, places) {
        if (err) {
            console.log("couldn't list: " + err);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(places));
    });
};