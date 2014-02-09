var entity = require('./entity'),
    mongoose = require('mongoose');

var placesSchema = mongoose.Schema({
    name: String
});
var Place = mongoose.model('places', placesSchema);

exports.setup = function( app ) {
    app.get('/places', list);
    app.get("/places/:id", read);
};

function list (req, res){
    Place.find( function (err, places) {
        answer(err, "list", res, places);
    });
}

function read ( req, res ) {
    var id = req.params.id;
    Place.findOne({ "_id": id}, function ( err, place ) {
        answer(err, "read", res, place);
    });
}

function answer ( err, verb, res, data ) {
    if (err) {
        console.log("couldn't " + verb + ": " + err);
        throw err;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}