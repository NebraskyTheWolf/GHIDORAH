const consoleColors = require('./ConsoleColor');

const prefix = `${consoleColors.FgBlue}[${consoleColors.FgCyan}ModuleManager - ${consoleColors.Reset}`

module.exports.log = async function (type, message) {
    switch (type) {
        case "INFO": {
            console.log(`${prefix}${consoleColors.FgGreen}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "WARN": {
            console.log(`${prefix}${consoleColors.FgYellow}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "ERROR": {
            console.log(`${prefix}${consoleColors.FgRed}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "CRITICAL": {
            console.log(`${prefix}${consoleColors.FgRed}${consoleColors.Blink}${type}${consoleColors.Reset}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        default:
            console.log(consoleColors.FgRed + 'Invalid logger: ' + type + `${consoleColors.Reset}`);
        break;
    }
}