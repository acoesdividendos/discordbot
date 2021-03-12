var mongoose = require('mongoose');

// User Schema
var NewAPISchema = mongoose.Schema({
    id_news: {
        type: String
    }
});

var NewAPI = module.exports = mongoose.model('NewAPI', NewAPISchema);

module.exports.createNewAPI = function(newNewAPI, callback) {
    newNewAPI.save(callback);
}
