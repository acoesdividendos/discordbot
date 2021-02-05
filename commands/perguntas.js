module.exports = {
  name: "perguntas",
  description: "send new position info",
  execute(message, args, Discord, client) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#29FF95")
      .setTitle("Documento perguntas frequentes")
      .setURL(
        "https://docs.google.com/document/d/1z_dtD65isd2-e50LvfJR9oyLEWl3WvblNQyap4FN7YU/edit#heading=h.im843s1iett7"
      )
      .addFields({
        name:
          "Visita o link seguinte para consultar as respostas às perguntas mais frequentes sobres investimentos:",
        value:
          "https://docs.google.com/document/d/1z_dtD65isd2-e50LvfJR9oyLEWl3WvblNQyap4FN7YU",
      })
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/794187077079662643/2e020867a5b9069970092b6f8268148a.png?size=128"
      )
      .setTimestamp()
      .setFooter(
        "Grupo de Investidores",
        "https://cdn.discordapp.com/avatars/794187077079662643/2e020867a5b9069970092b6f8268148a.png?size=128"
      );

    message.channel.send(exampleEmbed).then(() => {
      message.delete({ timeout: 1000 });
    });
  },
};
