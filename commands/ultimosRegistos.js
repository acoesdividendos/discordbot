module.exports = {
  name: "ultimosRegistos",
  description: "send Last Users Added",
  execute(message, args, Discord, client, values) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#29FF95")
      .setTitle("Ultimos 10 registos")
      .addFields({
        name: "Registos",
        value:
          values[0] +
          "\n" +
          values[1] +
          "\n" +
          values[2] +
          "\n" +
          values[3] +
          "\n" +
          values[4] +
          "\n" +
          values[5] +
          "\n" +
          values[6] +
          "\n" +
          values[7] +
          "\n" +
          values[8] +
          "\n" +
          values[9] +
          "\n" +
          values[10],
        inline: true,
      })
      .setTimestamp();

    message.channel.send(exampleEmbed);
  },
};
