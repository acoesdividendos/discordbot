module.exports = {
  name: "twitter",
  description: "send new tweet",
  execute(message, args, Discord, client) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#29FF95")
      .setTitle("Grupo de Investidores 🇵🇹 (@gdInvestidores)")
      .setURL("https://twitter.com/gdInvestidores/status/1368870453159354373")
      .addFields({
        name: "Coinmarketcap",
      })
      .setThumbnail(
        "https://pbs.twimg.com/media/Ev80aeFWEAAWK0X?format=jpg&name=medium"
      )
      .setTimestamp()
      .setFooter("Twitter");

    message.channel
      .send(
        "Novo tweet de @gdInvestidores \n https://twitter.com/gdInvestidores/status/1368870453159354373"
      )
      .then(() => {
        message.delete({ timeout: 1000 });
      });
  },
};
