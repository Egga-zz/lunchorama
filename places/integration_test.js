var describe = require('mocha').describe;
var it = require('mocha').it;
var should = require('chai').should();
var request = require('supertest');

var mongoose = require('mongoose'),
    entity = require("./entity"),
    Place = mongoose.model('Place');



    describe('/places', function(){
        it('returns a list of all places', function(){
require("../bin/app").startApp(function ( app ) {
            request(app)
                .get('/places')
                .expect('Content-Type', /json/)
                .expect('Content-Length', '20')
                .expect(200)
                .end(function(err, res){
                    if (err) throw err;
                });
        });
    });
});