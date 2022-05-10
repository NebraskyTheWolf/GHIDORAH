const Discord = require("discord.js");
const { GuildMember } = require("discord.js");
const blacklist = require('../../blacklist.json')

const loggingServer = {
    guildId: "969039234436567120",
    channelMod: "971477475651616858"
};

module.exports = async function (client, member) {
    let channel = client.guilds.cache.get(loggingServer.guildId).channels.cache.get(loggingServer.channelMod);

    if (member.bot 
        && member.flags !== 1 << 16) {
        const embedBlacklist = new Discord.MessageEmbed()
            .setTitle("SKF Industries - SECURITY WARNING")
            .setDescription(`<@${member.id}> are UNVERIFIED bot!, please be careful on using it.`);
        channel.send({
            embeds: [embedBlacklist],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            "style": 4,
                            "label": `Kick`,
                            "custom_id": `row_id_userAction_${member.id}_kickUser`,
                            "disabled": false,
                            "type": 2
                        }
                    ]
                }
            ]
        });
    }

    const embedBlacklist = new Discord.MessageEmbed()
        .setTitle("SKF Industries - BAD LURKER INTRUSION")
        .setDescription(`<@${member.id}> are blacklisted and tried to join. (ACTION: KICKED)`);

    let blacklistInfo = client.ModLog.isBlacklisted(member.id);

    if (blacklistInfo.data.active) {
        member.kick(blacklistInfo.data.reason);
        channel.send({
            embeds: [embedBlacklist],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            "style": 4,
                            "label": `User Informations`,
                            "custom_id": `row_id_userAction_${blacklistInfo.id}_userInfo`,
                            "disabled": false,
                            "type": 2
                        }
                    ]
                }
            ]
        });
    }

    // INVITE TRACKING

    const newInvites = await member.guild.invites.fetch();
    const oldInvites = await client.invites.get(member.guild.id);

    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
    const inviter = await client.users.fetch(invite.inviter.id);

    const inviteChannel = client.guilds.get('917714328327692338').channels.cache.get('934501121223950366');

    const embedJoin = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setDescription(`<@${member.id}> invited by <@${inviter.id}> and has now ${invite.uses} invites.`);
    inviteChannel.send({
        embeds: [embedJoin]
    });
};

module.exports = function formatUser(member) {
    let userJson = {
        id: member.id,
        name: member.username,
        data: {
            "flags": getFlagString(member.flags),
            "discriminator": member.discriminator,
            "bot": member.bot,
            "accentColor": member.accentColor,
            "system": member.system
        }
    }
    return userJson;
}


function getFlagString(bit) {
    switch (bit) {
        case 1 << 0:
            return "STAFF";
        case 1 << 1:
            return "PARTNER";
        case 1 << 2:
            return "HYPESQUAD";
        case 1 << 3:
            return "BUG_HUNTER_LEVEL_1";
        case 1 << 6:
            return "HYPESQUAD_ONLINE_HOUSE_1";
        case 1 << 7:
            return "HYPESQUAD_ONLINE_HOUSE_2";
        case 1 << 8:
            return "HYPESQUAD_ONLINE_HOUSE_3";
        case 1 << 9:
            return "PREMIUM_EARLY_SUPPORTER";
        case 1 << 10:
            return "TEAM_PSEUDO_USER";
        case 1 << 14:
            return "BUG_HUNTER_LEVEL_2";
        case 1 << 16:
            return "VERIFIED_BOT";
        case 1 << 17:
            return "VERIFIED_DEVELOPER";
        case 1 << 18:
            return "CERTIFIED_MODERATOR";
        case 1 << 19:
            return "BOT_HTTP_INTERACTIONS";
        default:
            return `UNHANDLER_FLAGS_0x${bit}`;
    }
}