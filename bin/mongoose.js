
var mongoose = require('mongoose');

console.log('Connecting to Mongo');
mongoose.connect('mongodb://' + process.env.IP +'/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("connected");
  
    var kittySchema = mongoose.Schema({
        name: String
    });
    var Kitten = mongoose.model('Kitten', kittySchema);
    var silence = new Kitten({ name: 'Silence' });
   
    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.save(function (err, fluffy) {
        if (err) {
            console.log("couldn't save: " + err);
        }
    });
    
    Kitten.find(function (err, kittens) {
        if (err) {
            console.log("couldn't save: " + err);
        }
      console.log(kittens)
    });
});


