const Discord = require("discord.js");
const client = new Discord.Client();
var config = require("../config.json");
var database = require("./database");
var Twit = require("twit");

var T = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET
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
    const vgmUrl = "https://finance.yahoo.com/most-active";
    var varZero = 0;
    var arrayReturn = [];
    got(vgmUrl)
      .then((response) => {
        const $ = cheerio.load(response.body);
        $("table > tbody > tr > td").each((i, link) => {
          if (varZero == i) {
            arrayReturn.push($(link).text());
            varZero = varZero + 10;
          }
        });
        resolve(arrayReturn);
      })
      .catch((err) => {
        console.log(err);
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
        channel.send("https://twitter.com/gdInvestidores/status/" + tweet.id_str);
      });
    }
  });
});

client.login(config.DISCORD_API_KEY);
