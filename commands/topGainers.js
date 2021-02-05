module.exports = {
  name: "topGainers",
  description: "send top Gainers info",
  execute(message, args, Discord, client, values) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#29FF95")
      .setTitle("Top Gainers do dia")
      .addFields(
        {
          name: "Ticker",
          value:
            values[0].ticker +
            "\n" +
            values[1].ticker +
            "\n" +
            values[2].ticker +
            "\n" +
            values[3].ticker +
            "\n" +
            values[4].ticker +
            "\n" +
            values[5].ticker +
            "\n" +
            values[6].ticker +
            "\n" +
            values[7].ticker +
            "\n" +
            values[8].ticker +
            "\n" +
            values[9].ticker +
            "\n" +
            values[10].ticker +
            "\n" +
            values[11].ticker +
            "\n" +
            values[12].ticker +
            "\n" +
            values[13].ticker +
            "\n" +
            values[14].ticker +
            "\n" +
            values[15].ticker,
          inline: true,
        },
        {
          name: "Price",
          value:
            values[0].price +
            "\n" +
            values[1].price +
            "\n" +
            values[2].price +
            "\n" +
            values[3].price +
            "\n" +
            values[4].price +
            "\n" +
            values[5].price +
            "\n" +
            values[6].price +
            "\n" +
            values[7].price +
            "\n" +
            values[8].price +
            "\n" +
            values[9].price +
            "\n" +
            values[10].price +
            "\n" +
            values[11].price +
            "\n" +
            values[12].price +
            "\n" +
            values[13].price +
            "\n" +
            values[14].price +
            "\n" +
            values[15].price,
          inline: true,
        },
        {
          name: "Change",
          value:
            values[0].percentualChange +
            "\n" +
            values[1].percentualChange +
            "\n" +
            values[2].percentualChange +
            "\n" +
            values[3].percentualChange +
            "\n" +
            values[4].percentualChange +
            "\n" +
            values[5].percentualChange +
            "\n" +
            values[6].percentualChange +
            "\n" +
            values[7].percentualChange +
            "\n" +
            values[8].percentualChange +
            "\n" +
            values[9].percentualChange +
            "\n" +
            values[10].percentualChange +
            "\n" +
            values[11].percentualChange +
            "\n" +
            values[12].percentualChange +
            "\n" +
            values[13].percentualChange +
            "\n" +
            values[14].percentualChange +
            "\n" +
            values[15].percentualChange,
          inline: true,
        }
      )
      .setTimestamp();

    message.channel.send(exampleEmbed).then(() => {
      message.delete({ timeout: 1000 });
    });
  },
};
