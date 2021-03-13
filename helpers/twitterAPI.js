const needle = require("needle");
const cron = require("node-cron");
const fs = require("fs");
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
  /*consumer_key: config.DEMO_CONSUMER_KEY,
  consumer_secret: config.DEMO_CONSUMER_SECRET,
  access_token: config.DEMO_ACCESS_TOKEN,
  access_token_secret: config.DEMO_ACCESS_TOKEN_SECRET,*/
});

// this is the ID for @TwitterDev
const userId = "1368593986106109957";
const url = `https://api.twitter.com/2/users/${userId}/tweets`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = config.DEMO_TWITTER_API_KEY;
//const bearerToken = process.env.BEARER_TOKEN;

exports.getUserTweets = async () => {
  let userTweets = [];

  // we request the author_id expansion so that we can print out the user name later
  let params = {
    max_results: 100,
    "tweet.fields": "created_at",
    expansions: "author_id",
  };

  const options = {
    headers: {
      "User-Agent": "v2UserTweetsJS",
      authorization: `Bearer ${bearerToken}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  let userName;
  console.log("Retrieving Tweets...");

  let resp = await getPage(params, options, nextToken);
  if (
    resp &&
    resp.meta &&
    resp.meta.result_count &&
    resp.meta.result_count > 0
  ) {
    lastId = resp.meta.newest_id;
    userName = resp.includes.users[0].username;
    if (resp.data) {
      userTweets.push.apply(userTweets, resp.data);
    }
    if (resp.meta.next_token) {
      nextToken = resp.meta.next_token;
    } else {
      hasNextPage = false;
    }
  } else {
    hasNextPage = false;
  }
  return lastId;
};

const getPage = async (params, options, nextToken) => {
  if (nextToken) {
    params.pagination_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

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

client.login(config.DISCORD_API_KEY);
