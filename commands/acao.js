module.exports = {
  name: "acao",
  description: "send new position info",
  execute(message, args, Discord, client) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#29FF95")
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription("Nova transação do " + `<@${message.author.id}>`)
      .addFields(
        { name: "Ativo", value: args[0] },
        { name: "Tipo de posição", value: args[1] },
        {
          name: "Descrição",
          value: args[2],
        },
        {
          name: "Posição detalhada",
          value: args[3],
        }
      )
      .setTimestamp()
      .setFooter(
        "Isto é apenas para registo e não deve ser copiado",
        message.member.user.avatarURL()
      );

    client.channels.cache
      .get(`804852650909892609`)
      .send(exampleEmbed)
      .then(() => {
        message.delete({ timeout: 1000 });
      });
  },
};
