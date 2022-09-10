const config = require('../../config/config.json')

module.exports = client => {
    client.logger.log('INFO', `------------------------------------------------------------------------------------------------------`);
    client.logger.log('INFO', '  ²█████████  █████   █████ █████ ██████████      ███████    ███████████     █████████   █████   █████');
    client.logger.log('INFO', '  ███░░░░░███░░███   ░░███ ░░███ ░░███░░░░███   ███░░░░░███ ░░███░░░░░███   ███░░░░░███ ░░███   ░░███ ');
    client.logger.log('INFO', ' ███     ░░░  ░███    ░███  ░███  ░███   ░░███ ███     ░░███ ░███    ░███  ░███    ░███  ░███    ░███ ');
    client.logger.log('INFO', '░███          ░███████████  ░███  ░███    ░███░███      ░███ ░██████████   ░███████████  ░███████████ ');
    client.logger.log('INFO', '░███    █████ ░███░░░░░███  ░███  ░███    ░███░███      ░███ ░███░░░░░███  ░███░░░░░███  ░███░░░░░███ ');
    client.logger.log('INFO', '░░███  ░░███  ░███    ░███  ░███  ░███    ███ ░░███     ███  ░███    ░███  ░███    ░███  ░███    ░███ ');
    client.logger.log('INFO', ' ░░█████████  █████   █████ █████ ██████████   ░░░███████░   █████   █████ █████   █████ █████   █████');
    client.logger.log('INFO', '  ░░░░░░░░░  ░░░░░   ░░░░░ ░░░░░ ░░░░░░░░░░      ░░░░░░░    ░░░░░   ░░░░░ ░░░░░   ░░░░░ ░░░░░   ░░░░░');
    client.logger.log('INFO', '         Author: NebraskyTheWolf <farfy.dev@gmail.com>');
    client.logger.log('INFO', '         Licence: GNU GPLv3 ( Non-Commercial )');
    client.logger.log('INFO', '         Notes: By using this code you agree to use that bot with non-profit or commercial action.');
    client.logger.log('INFO', `         Version: ${client.version}`);
    client.logger.log('INFO', `         Revision: ${client.revision === undefined ? 'Unknown': client.revision}`);
    client.logger.log('INFO', `------------------------------------------------------------------------------------------------------`);

    if (!config.eula) {
      client.logger.log('INFO', `------------------------------------------------------------------------------------------------------`);
      client.logger.log('INFO', `                               YOU NEED TO ACCEPT THE EULA TO CONTINUE                                `);
      client.logger.log('INFO', `------------------------------------------------------------------------------------------------------`);
      process.exit(7);
    }
}