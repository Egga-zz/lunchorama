var describe = require('mocha').describe;
var it = require('mocha').it;
var should = require('chai').should();
var request = require('supertest');

var mongoose = require('mongoose'),
    entity = require("./entity"),
    Place = mongoose.model('Place');


request = request('http://localhost:8080');

describe('/places', function(){
    it('returns a list of all places', function(){

        request.get('/places')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
            });
    });
});
describe('/places/:id', function(){
    it('returns a specific place with given :id', function(){

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