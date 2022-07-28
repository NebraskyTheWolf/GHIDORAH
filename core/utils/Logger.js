const consoleColors = require('./ConsoleColor');

const prefix = `${consoleColors.FgBlue}[${consoleColors.FgCyan}GHIDORAH - ${consoleColors.Reset}`;
module.exports.log = async function (type = 'INFO', message = '') {
    switch (type) {
        case "startProgress": {}
        break;
        case "stopProgress": {}
        break;
        case "INFO": {
            console.error(`${prefix}${consoleColors.FgGreen}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "WARN": {
            console.error(`${prefix}${consoleColors.FgYellow}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "ERROR": {
            console.error(`${prefix}${consoleColors.FgRed}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "DEBUG": {
            console.error(`${prefix}${consoleColors.FgRed}${consoleColors.Blink}${type}${consoleColors.Reset}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "DELETE": {
            console.log(`${prefix}${consoleColors.BgRed}${consoleColors.Blink}${type}${consoleColors.Reset}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        default:
            console.error(consoleColors.FgRed + 'Invalid logger: ' + type + `${consoleColors.Reset}`, true);
        break;
    }
}