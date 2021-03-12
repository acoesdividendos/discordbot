module.exports = {
  name: "news",
  description: "send news",
  execute(Discord, client, news) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#29FF95")
      .setTitle(news.title)
      .addFields({
        name: news.url,
        value: news.text,
      })
      .setThumbnail(news.image)
      .setTimestamp()
      .setFooter(news.site);
    const channel = client.channels.cache.find(
      (channel) => channel.id === "819870868293025792"
    );
    channel.send(exampleEmbed);
  },
};
