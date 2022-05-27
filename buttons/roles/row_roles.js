const { Collection, MessageActionRow, MessageSelectMenu  } = require('discord.js');
module.exports = {
    data: {
        name: "row_roles"
    },
    async execute(interaction, interactionUser, guild) {
        if (guild.selfroles.active) {
            const categories = guild.selfroles.config.categories;
            const roles = guild.selfroles.config.roles;
            
            const row = new MessageActionRow();

            categories.forEach(async (result) => console.log(result.components[0]));
        }
    }
}