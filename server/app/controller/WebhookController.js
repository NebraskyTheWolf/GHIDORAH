const channelVerification = {
  guildId: "917714328327692338",
  channelId: "934501150126903376"
}

const { MessageEmbed, Message } = require("discord.js")


module.exports = {
    initNotification: function (req, res) {
        let data = req.body;

        client.events.emit('githubPush', {status: true, data: data});

        const logChannel = client.guilds.cache.get('917714328327692338')
            .channels.cache.get('970398815490293860');

        logChannel.send({
            "embeds": [
                {
                  "type": "rich",
                  "title": `SKF Industries - GHIDORAH NEW UPDATE!`,
                  "description": `Added: \`\`\` ${data.head_commit.added} \`\`\` Removed: \`\`\` ${data.head_commit.removed} \`\`\` Modified: \`\`\` ${data.head_commit.modified} \`\`\` Commit: \`\`\` ${data.commits[0].message} \`\`\` Commit ID: \`\`\` ${data.head_commit.id} \`\`\``,
                  "color": 0xff0066,
                  "fields": [
                    {
                      "name": `Reference`,
                      "value": `${data.ref}`,
                      "inline": true
                    },
                    {
                      "name": `Repository`,
                      "value": `${data.repository.full_name}`,
                      "inline": true
                    },
                    {
                      "name": `Pushed by`,
                      "value": `${data.repository.owner.name}`,
                      "inline": true
                    }
                  ]
                }
            ]
        });

        res.status(200).end();

        
    },
    verifyNotification: async function (req, res) {
      const guild = await client.Database.fetchGuild(req.body.guildId);

      if (guild.verification.online) {
        let userId = req.body.userId;
        let question1 = req.body.answers.findus;
        let question2 = req.body.answers.age;
        let question3 = req.body.answers.furry;
        let question4 = req.body.answers.fursona;
        let question5 = req.body.answers.rules;
 
        const logChannel = client.guilds.cache.get(guild.id).channels.cache.get(guild.verification.logChannel);
        const member = client.guilds.cache.get(guild.id).members.cache.get(userId);
 
        const embed = new MessageEmbed()
           .setColor("ORANGE")
           .setTitle("GHIDORAH - Verification request (ONLINE BETA FORM).")
           .setDescription(`How did you find us?: \`\`\`${question1}\`\`\` How old are you?: \`\`\`${question2}\`\`\` What is a furry?: \`\`\`${question3}\`\`\` Do you have a fursona?: \`\`\`${question4}\`\`\` Have you read the rules?: \`\`\`${question5}\`\`\``)
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
                                   "custom_id": `row_id_userAction_${member.user.id}_${guild.id}_acceptVerify`,
                                   "disabled": false,
                                   "type": 2
                               },
                               {
                                   "style": 4,
                                   "label": `Deny`,
                                   "custom_id": `row_id_userAction_${member.user.id}_${guild.id}_denyVerify`,
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