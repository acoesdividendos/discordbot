const Discord = require("discord.js");
const client = new Discord.Client();
var config = require("../config.json");
var database = require("./database");
var Twit = require("twit");

var T = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET,
});

var Tdemo = new Twit({
  consumer_key: config.DEMO_CONSUMER_KEY,
  consumer_secret: config.DEMO_CONSUMER_SECRET,
  access_token: config.DEMO_ACCESS_TOKEN,
  access_token_secret: config.DEMO_ACCESS_TOKEN_SECRET,
});

// this is the ID for @TwitterDev
const userId = "1368593986106109957";
//const userId = "1369370841239199744";

exports.postTweet = function (params) {
  var promise = new Promise(function (resolve, reject) {
    T.post("statuses/update", params, function (err, data, response) {
      if (err) {
        console.log(err);
      }
      var newId = data.id_str;
      database
        .addTweetID(newId)
        .then(() => {
          const channel = client.channels.cache.find(
            (channel) => channel.id === "818257853168877578"
          );
          channel.send("https://twitter.com/gdInvestidores/status/" + newId);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  });
  return promise;
};

var stream = Tdemo.stream("statuses/filter", { follow: userId });
stream.on("tweet", function (tweet) {
  database.checkIfTweetIdExist(tweet.id_str).then((result) => {
    if (!result) {
      database.addTweetID(tweet.id_str).then(() => {
        const channel = client.channels.cache.find(
          (channel) => channel.id === "818257853168877578"
        );
        channel.send(
          "https://twitter.com/gdInvestidores/status/" + tweet.id_str
        );
      });
    }
  });
});

client.login(config.DISCORD_API_KEY);
