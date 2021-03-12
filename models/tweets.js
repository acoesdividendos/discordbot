var mongoose = require('mongoose');

// User Schema
var TweetSchema = mongoose.Schema({
    id_tweet: {
        type: String
    }
});

var Tweet = module.exports = mongoose.model('Tweet', TweetSchema);

module.exports.createTweet = function(newTweet, callback) {
    newTweet.save(callback);
}