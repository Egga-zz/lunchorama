var mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        name: String
    }
);

mongoose.model('Place', schema);
