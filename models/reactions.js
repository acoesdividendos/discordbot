var mongoose = require('mongoose');

// User Schema
var ReactionsSchema = mongoose.Schema({
    id_reaction: {
        type: String
    }
});

var NewReaction = module.exports = mongoose.model('NewReaction', ReactionsSchema);

module.exports.createNewReaction = function(newReaction, callback) {
    newReaction.save(callback);
}
