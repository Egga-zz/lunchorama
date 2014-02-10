var describe = require('mocha').describe;
var it = require('mocha').it;
var should = require('chai').should();
var request = require('supertest');

var mongoose = require('mongoose'),
    entity = require("./entity"),
    Place = mongoose.model('Place');

var fixtures = require('pow-mongoose-fixtures');

request = request('http://localhost:8080');


fixtures.load({
    Place: [
        { name: 'Mercan' },
        { name: 'Cicciolina' }
    ]
});
describe('GET /places', function(){
    it('Returns a list of all saved places.', function(){
        // expected results
            // happy case
                // id exists
                // headers
                // payload
            // returns
                // status code
                // headers
                // payload
        request.get('/places')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                console.log(JSON.stringify(res.body));
            });
    });
});

describe('GET /places/:id', function(){
    it('Returns a specific place.', function(){

        request.get('/places/52f6411d22ecf0ad715d5108')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect( {
                "name":"Best Rest",
                "_id":"52f6411d22ecf0ad715d5108",
                "__v":0
            })
            .end(function(err, res){
                if (err) throw err;
            });
    });
});