const Discord = require("discord.js");
const blacklist = require('../../blacklist.json')

module.exports = function (client, member) {
    let channel = client.guilds.cache.get("917714328327692338").channels.cache.get("939211908546957312");

    console.log(member.id);

    const embedBlacklist = new Discord.MessageEmbed()
        .setTitle("SKF Industries - BAD LURKER INTRUSION")
        .setDescription(`<@${member.id}> are blacklisted and tried to join. (ACTION: KICKED)`)

    for (bl in blacklist.data) {
        let data = blacklist.data[bl];
        console.log(data);
        console.log(bl);

        if (data.id === member.id 
                && data.active === true) {
            member.kick(data.user.reason);
            channel.send({
                embeds: [embedBlacklist],
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                "style": 4,
                                "label": `User Informations`,
                                "custom_id": `row_id_userAction_${data.id}_userInfo`,
                                "disabled": false,
                                "type": 2
                            }
                        ]
                    }
                ]
            })
        }
    }
};