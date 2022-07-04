const { MessageEmbed } = require("discord.js")
module.exports = new class {
  async initNotification (req, res) {
        client.events.emit('githubEvent', 
          {status: true, data: req.body}
        );
        res.status(200).end();
  }

  async verifyNotification (req, res) {
      const guild = await client.Database.fetchGuild(req.body.guildId);

      if (guild.verification.online) {
        let userId = req.body.userId;

        let question1 = req.body.answers.findus;
        let question2 = req.body.answers.age;
        let question3 = req.body.answers.furry;
        let question4 = req.body.answers.fursona;
        let question5 = req.body.answers.rules;

        const logChannel = client.guilds.cache.get(guild.id).channels.cache.get(guild.verification.channels.logChannel);
        const member = client.guilds.cache.get(guild.id).members.cache.get(userId);
 
        const embed = new MessageEmbed()
           .setColor("ORANGE")
           .setTitle("GHIDORAH - Verification request (ONLINE BETA FORM).")
           .setDescription(`How did you find us?: \`\`\`${question1}\`\`\` How old are you?: \`\`\`${question2}\`\`\` Why you want to join our server?: \`\`\`${question3}\`\`\` Have you read the rules?: \`\`\`${question5}\`\`\``)
           .addField("Username", `${member.user.username}`, true)
           .addField("Descriminator", `${member.user.discriminator}`, true)
           .addField("ID", `${member.user.id}`, true)
           .setThumbnail(`https://cdn.discordapp.com/avatars/${userId}/${member.user.avatar}.jpeg`);

           logChannel.send({
               embeds: [embed],
               components: [
                     {
                         type: 1,
                         components: [
                               {
                                   "style": 3,
                                   "label": `Accept`,
                                   "custom_id": `row_id_userAction_${member.user.id}_${guild.id}_acceptVerifyOnline`,
                                   "disabled": false,
                                   "type": 2
                               },
                               {
                                   "style": 4,
                                   "label": `Deny`,
                                   "custom_id": `row_id_userAction_${member.user.id}_${guild.id}_denyVerifyOnline`,
                                   "disabled": false,
                                   "type": 2
                               }
                         ]
                     }
               ]
           });
           res.status(200).json({
            status: true,
            done: 'VERIFICATION_SENT'
          }).end();
      } else {
        res.status(403).json({
          status: false,
          error: 'SERVER_NOT_SET_UP'
        }).end();
      }
    }
};