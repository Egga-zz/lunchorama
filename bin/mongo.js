var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
console.log('Connecting to Mongo');
  MongoClient.connect('mongodb://' + process.env.IP +':27017/test', function(err, db) {
    if(err) throw err;

   console.log("looks good");
    var collection = db.collection('test_places');
    collection.insert(
        {
            name: 'Mercan',
        }, function(err, docs) {
            console.log('inserted');
        }
    );
        
    collection.find().toArray(function(err, results) {
        console.log(JSON.stringify(results));
    });
  });