const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: {
        name: "row_roles"
    },
    async execute(interaction, interactionUser, guild) {
        if (guild.selfroles.active) {
            const cate = guild.selfroles.config.categories;

            const list = [];
            cate.forEach(category => {
                list.push(
                    new MessageActionRow()
                        .addComponents([category])
                );
            });
            const comps = [];
            list.forEach(cmp => comps.push({
                type: 1,
                components: [ cmp ]
            }));

            console.log(list)
            console.log(comps)

            interaction.reply({
                components: [ comps ],
                flags: 64
            });
        } else {
            interaction.reply({
                content: 'We\'re sorry but the self roles are disabled.',
                ephemeral: true,
                flags: 64
            });
        }
    }
}