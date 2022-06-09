const { readdirSync } = require("fs");

const ascii = require("ascii-table");
let table = new ascii("TWITCH COMMANDS");

module.exports = twitchClient, client => {
	readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}`).filter(file => file.startsWith('.js'));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.twitchCommands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌  -> missing a help.name, or help.name is not a string.')
            }
        }
    });
    client.logger.log('INFO', table.toString());
};