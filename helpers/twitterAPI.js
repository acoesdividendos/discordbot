const needle = require("needle");
const cron = require("node-cron");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
var config = require("../config.json");
var coin360 = require("./coin360");

// this is the ID for @TwitterDev
const userId = "1368593986106109957";
const url = `https://api.twitter.com/2/users/${userId}/tweets`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = config.TWITTER_API_KEY;
//const bearerToken = process.env.BEARER_TOKEN;

const getUserTweets = async () => {
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

  while (hasNextPage) {
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

/*cron.schedule("* * * * *", function () {
  getUserTweets().then((newId) => {
    var lastIdFromFile = "";
    fs.readFile("lastID.txt", function (err, buf) {
      lastIdFromFile = buf.toString();
      if (!lastIdFromFile.includes(newId)) {
        const channel = client.channels.cache.find(
          (channel) => channel.id === "818257853168877578"
        );
        channel.send("https://twitter.com/gdInvestidores/status/" + newId);
        lastIdFromFile = lastIdFromFile.replace("[", "").replace("]", "");
        lastIdFromFile.split(",");
        var newArrayIds = [];
        newArrayIds.push(lastIdFromFile);
        newArrayIds.push(newId);
        fs.writeFile("lastID.txt", newArrayIds.toString(), (err) => {
          if (err) console.log(err);
          console.log("Successfully Written to File.");
        });
      }
    });
  });
});*/

cron.schedule("0 21 * * *", function () {
  coin360.getImageAndMakeTweet();
});

client.login(config.DISCORD_API_KEY);

/*fs.readFile("lastID.txt", function (err, buf) {
  lastIdFromFile = buf.toString();
  console.log();
});*/

/*fs.writeFile("lastID.txt", newId, (err) => {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});

var lastIdFromFile = "['1368885438191181826','1368885438191181826']";
lastIdFromFile = lastIdFromFile.replace("[", "").replace("]", "");
lastIdFromFile.split(",");
var newId = "test";
var newArrayIds = [];
newArrayIds.push(lastIdFromFile);
newArrayIds.push(newId);
fs.writeFile("lastID.txt", newArrayIds.toString(), (err) => {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});

fs.readFile("lastID.txt", function (err, buf) {
  lastIdFromFile = buf.toString();
  console.log(lastIdFromFile.includes("test"));
});*/
