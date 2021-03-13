module.exports = {
  name: "news",
  description: "send news",
  execute(Discord, client, news, result) {
    var tweetDescription =
      news.text +
      "\n\n" +
      "$".concat(news.symbol) +
      "\n" +
      result.currentValue +
      "\n" +
      result.percentChange;
    var color = tweetDescription.length < 250 ? "#29FF95" : "#ff0000";
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(news.title)
      .addFields(
        {
          name: news.url,
          value: news.text,
        },
        {
          name: "$".concat(news.symbol),
          value: result.marketStatus,
        },
        { name: result.currentValue, value: result.percentChange }
      )
      .setThumbnail(news.image)
      .setTimestamp()
      .setFooter(news.site);
    const channel = client.channels.cache.find(
      (channel) => channel.id === "819870868293025792"
    );
    channel.send(exampleEmbed);
  },
};
