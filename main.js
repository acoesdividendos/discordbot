const Discord = require("discord.js");
const client = new Discord.Client();
var apiCalls = require("./helpers/apiCalls");

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
    case "toplosers":
      apiCalls.getLosersMovers().then((array) => {
        client.commands
          .get("topLosers")
          .execute(message, args, Discord, client, array);
      });
  }
});

client.login(config.DISCORD_API_KEY);
