const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
var apiCalls = require("./helpers/apiCalls");
var database = require("./helpers/database");
var twitterAPI = require("./helpers/twitterAPI");
var coin360 = require("./helpers/coin360");
var Request = require("request");
const cron = require("node-cron");

const prefix = "!";

const fs = require("fs");
var config = require("./config.json");
const { randomInt } = require("crypto");

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("message", (message) => {
  if (message.member.roles.cache.some((role) => role.name === "Spammer")) {
    message.embeds.forEach((embed) => {
      if (embed.url) {
        message.delete({ timeout: 1 });
      }
    });
  }
  if (message.member.roles.cache.some((role) => role.name === "Troll")) {
    message.delete({ timeout: 1 });
  }
  if (
    message.member.roles.cache.some(
      (role) => role.name === "Grupo de Investidores BOT"
    ) &&
    message.channel.id === "818257853168877578"
  ) {
    var emojis = ["🚀", "😄", "👌", "👀", "✅", "📈", "👍"];
    message.react(emojis[Math.floor(Math.random() * emojis.length)]);
    message.react(emojis[Math.floor(Math.random() * emojis.length)]);
    message.react(emojis[Math.floor(Math.random() * emojis.length)]);
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/  +/);
  const command = args.shift().toLowerCase();
  switch (command) {
    case "acao":
      if (
        message.member.roles.cache.some((role) => role.name === "Administrador")
      ) {
        client.commands.get("acao").execute(message, args, Discord, client);
      }
      break;
    case "perguntas":
      client.commands.get("perguntas").execute(message, args, Discord, client);
      break;
    case "mostactives":
      apiCalls.getMostActives().then((array) => {
        client.commands
          .get("mostActives")
          .execute(message, args, Discord, client, array);
      });
      break;
    case "trendingtickers":
      apiCalls.getTrendingTickers().then((array) => {
        client.commands
          .get("trendingTickers")
          .execute(message, args, Discord, client, array);
      });
      break;
    case "topgainers":
      apiCalls.getTopMovers().then((array) => {
        client.commands
          .get("topGainers")
          .execute(message, args, Discord, client, array);
      });
      break;
    case "deletemsg":
      if (
        message.member.roles.cache.some(
          (role) => role.name === "Administrador"
        ) &&
        message.channel.id === "819870868293025792"
      ) {
        message.channel.messages.fetch({ limit: 10 }).then((messages) => {
          message.channel.bulkDelete(messages);
        });
      }
      break;
    case "ttw":
      if (
        message.member.roles.cache.some(
          (role) => role.name === "Administrador"
        ) &&
        message.channel.id === "721461237845852220"
      ) {
        const channel = client.channels.cache.find(
          (channel) => channel.id === "818257853168877578"
        );
        channel.send(args[0]);
      }
      break;
    case "toplosers":
      apiCalls.getLosersMovers().then((array) => {
        client.commands
          .get("topLosers")
          .execute(message, args, Discord, client, array);
      });
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.message.channel.name === "news") {
    var messagedReactedId = reaction.message.id;
    database.checkIfReactionIdExist(messagedReactedId).then((exist) => {
      if (!exist) {
        reaction.message.channel.messages
          .fetch(messagedReactedId)
          .then((message) => {
            title = message.embeds[0].title;
            link = message.embeds[0].fields[0].name;
            text = message.embeds[0].fields[0].value;
            ticker = message.embeds[0].fields[1].name;
            currentPrice = message.embeds[0].fields[2].name;
            change = message.embeds[0].fields[2].value;
            var tweetDescription =
              text + "\n\n" + ticker + "\n" + currentPrice + "\n" + change;
            if (reaction.emoji.name === "👍") {
              tweetDescription =
                title + "\n\n" + ticker + "\n" + currentPrice + "\n" + change;
            }
            if (tweetDescription.length > 250) {
              tweetDescription =
                title + "\n\n" + ticker + "\n" + currentPrice + "\n" + change;
            }
            tweetDescription = tweetDescription + "\n" + link;
            var params = { status: tweetDescription };
            twitterAPI
              .postTweet(params)
              .then(() => {
                database.addNewReactionId(messagedReactedId).then(() => {});
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    });
  }
});

cron.schedule("* * * * *", function () {
  var promise = new Promise(function (resolve, reject) {
    var financeURL =
      "https://financialmodelingprep.com/api/v3/stock_news?tickers=SPY,DJI,QQQ,GME,AAPL,FB,GOOG,AMZN,FB,SFT,PG,PEP,KO,DIS,GAN,TSLA,TTCF,BABA,TCEHY,V,SQ,DBX,PLTR,PLBY,ZM,LMND,MMM,MA,JNJ,PFE,PYPL,NFLX,NIO,INTC,AMD,NVDA,MSFT,JD,MRNA,BYND,CRM,TSM,T,MCD,MSTR,SHOP,SPOT,SNAP,OPEN,UBER,ABNB,RBLX,SPCE&apikey=7fe81ed8f6a0ea84b9c6a45ca3018c58&limit=10";

    Request.get(financeURL, function (err, response) {
      if (err) {
        console.log(err);
        reject({
          messageType: "error",
        });
      } else {
        if (response.body.length) {
          const news = JSON.parse(response.body);
          news.forEach((element) => {
            newId = element.url;
            database.checkIfNewsIdExist(element).then((result) => {
              if (!result) {
                database.addNewsID(element).then(() => {
                  apiCalls.getCurrentPrice(element.symbol).then((result) => {
                    client.commands
                      .get("news")
                      .execute(Discord, client, element, result);
                  });
                });
              }
            });
          });
          resolve();
        } else {
          reject({
            messageType: "error",
          });
        }
      }
    });
  });
  return promise;
});

cron.schedule("0 22 * * *", function () {
  coin360.getImageAndMakeTweet();
});

client.login(config.DISCORD_API_KEY);
