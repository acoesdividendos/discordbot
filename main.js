const Discord = require("discord.js");
const client = new Discord.Client();
var apiCalls = require("./helpers/apiCalls");
var database = require("./helpers/database");
var Request = require("request");
const cron = require("node-cron");

const prefix = "!";

const fs = require("fs");
var config = require("./config.json");

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
    case "toplosers":
      apiCalls.getLosersMovers().then((array) => {
        client.commands
          .get("topLosers")
          .execute(message, args, Discord, client, array);
      });
  }
});

cron.schedule("* * * * *", function () {
  var promise = new Promise(function (resolve, reject) {
    var financeURL =
      "https://financialmodelingprep.com/api/v3/stock_news?tickers=SPY,DJI,QQQ,GME,AAPL,FB,GOOG,AMZN,FB,SFT,PG,PEP,KO,DIS,GAN,TSLA,TTCF,BABA,TCEHY,V,SQ,DBX,PLTR,PLBY,ZM,LMND,MMM,MA,JNJ,PFE,PYPL,NFLX,NIO,INTC,AMD,NVDA,MSFT,JD,MRNA&apikey=7fe81ed8f6a0ea84b9c6a45ca3018c58&limit=10";

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
                  client.commands.get("news").execute(Discord, client, element);
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

client.login(config.DISCORD_API_KEY);
