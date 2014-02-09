var entity = require('./entity'),
    mongoose = require('mongoose');

var placesSchema = mongoose.Schema({
    name: String
});
var Place = mongoose.model('places', placesSchema);

exports.setup = function( app ) {
    app.get("/places", list);
    app.post("/places", create);

    app.get("/places/:id", read);
    app.put("/places/:id", update);
    app.delete("/places/:id", remove);
};

function list (req, res){
    Place.find( function (err, places) {
        answer(err, "list", res, places);
    });
}

function create ( req, res ) {
    var data = req.body;
    console.log("Attempting to create: " + JSON.stringify(data));

    var place = new Place( req.body );
    console.log("Document created: " + JSON.stringify(place));

    place.save(function (err) {
        if (err) {
            console.log("Couldn't create: " + err);
        }

        console.log('place created');
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end( JSON.stringify(place) );
    });
}

function read ( req, res ) {
    var id = req.params.id;
    Place.findOne({ "_id": id}, function ( err, place ) {
        answer(err, "read", res, place);
    });
}

function update ( req, res ) {
    var id = req.params.id;
    console.log("Attempting to update id[" + id + "]");

    var data = req.body;
    console.log("Sent data: " + JSON.stringify(data));

    var query = { "_id": id };
    Place.findOneAndUpdate(query, data, function ( err, place ) {
        if (err) {
            console.log("Couldn't update: " + err);
        }

        res.writeHead(204);
        res.end();
    });
}

function remove ( req, res ) {
    var id = req.params.id;
    Place.findByIdAndRemove(id, function ( err, place ) {
        if (err) {
            console.log("Couldn't remove: " + err);
        }

        res.writeHead(204);
        res.end();
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