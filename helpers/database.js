var mongoose = require("mongoose");
var config = require("../config.json");
var NewAPI = require("../models/news"); // get the mongoose model
var Tweet = require("../models/tweets"); // get the mongoose model
var Reaction = require("../models/reactions");

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.addNewsID = function (element) {
  var promise = new Promise(function (resolve, reject) {
    var newNew = new NewAPI({
      id_news: element.url,
    });
    newNew.save(function (err, wishlist) {
      if (err) {
        resolve();
      } else {
        resolve();
      }
    });
  });
  return promise;
};

exports.checkIfNewsIdExist = function (element) {
  var promise = new Promise(function (resolve, reject) {
    NewAPI.findOne({ id_news: element.url }, function (err, news) {
      if (err) throw err;
      if (!news) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
  return promise;
};

exports.addTweetID = function (newId) {
  var promise = new Promise(function (resolve, reject) {
    var newTweet = new Tweet({
      id_tweet: newId,
    });
    newTweet.save(function (err, wishlist) {
      if (err) {
        resolve();
      } else {
        resolve();
      }
    });
  });
  return promise;
};

exports.checkIfTweetIdExist = function (newId) {
  var promise = new Promise(function (resolve, reject) {
    Tweet.findOne({ id_tweet: newId }, function (err, tweet) {
      if (err) throw err;
      if (!tweet) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
  return promise;
};

exports.addNewReactionId = function (newId) {
  var promise = new Promise(function (resolve, reject) {
    var newReaction = new Reaction({
      id_reaction: newId,
    });
    newReaction.save(function (err, wishlist) {
      if (err) {
        resolve();
      } else {
        resolve();
      }
    });
  });
  return promise;
};

exports.checkIfReactionIdExist = function (newId) {
  var promise = new Promise(function (resolve, reject) {
    Reaction.findOne({ id_reaction: newId }, function (err, reaction) {
      if (err) throw err;
      if (!reaction) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
  return promise;
};
