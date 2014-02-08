var mongoose = require('mongoose'),
    entity = require("./entity"),
    Place = mongoose.model('Place');


exports.setup = function( app ) {
    app.get('/places', list);
};


function create (req, res){
    var newPlace = new Place({ name: 'muggel' });
    newPlace.save(function (err, place) {
        if (err) {
            console.log("couldn't save: " + err);
        }
    });
}

function list (req, res){

    Place.find(function (err, places) {
        if (err) {
            console.log("couldn't save: " + err);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(places));
    });
};