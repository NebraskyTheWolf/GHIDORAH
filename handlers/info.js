const revision = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString().trim();

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
    client.logger.log('INFO', '         Author: MitsuiHoshiko <contact@skf-studios.com>');
    client.logger.log('INFO', `         Version: ${client.version}`);
    client.logger.log('INFO', `         Revision: ${revision === undefined ? 'Error': revision}`);
    client.logger.log('INFO', `------------------------------------------------------------------------------------------------------`);
}