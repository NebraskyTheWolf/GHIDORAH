const Discord = require("discord.js");
const { v4 } = require('uuid');

module.exports = {
    name: "createapp",
    description: "Manage application auth",
    commandOptions: [
        {
            "type": 3,
            "name": "appname",
            "description": "app name",
            "required": true
        },
        {
            "type": 3,
            "name": "appdesc",
            "description": "app desc",
            "required": true
        }
    ],
    async execute(interaction) {  
        await client.Database.isDeveloper(interaction.member.user.id, async result => {
            if (result.isDev) {
                const appName = interaction.data.options[0].value;
                const appDesc = interaction.data.options[1].value;

                client.Database.createDefaultApplication({
                    appName: appName,
                    appDescription: appDesc,
                    appEnabled: true,
                    issuer: interaction.member.user.id
                }, result => {        
                    let finalResult = new Discord.MessageEmbed()
                        .setTitle("Application created")
                        .setDescription(`{ accessToken: ${result.data.auth.accessToken}, refreshToken: ${result.data.auth.refreshToken}}`)
                        .addField('HEADER-TOKEN', `${result.data.token}`, false)
                        .addField('Application Name', `${result.data.appName}`, false)
                        .addField('Application Desc', `${result.data.appDescription}`, false)
                        .addField('Enabled', `${result.data.appEnabled}`, false);
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                embeds: [finalResult],
                                flags: 64
                            }
                        }
                    });
                });
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Permission denied.")
                    .setDescription(`Only my developer can use this command...`);
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [embed],
                            flags: 64
                        }
                    }
                });
            }
        }); 
    }
}