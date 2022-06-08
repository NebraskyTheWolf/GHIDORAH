const consoleColors = require('./ConsoleColor');
const UI = require('console-ui');
const ui = new UI({
    inputStream: process.stdin,
    outputStream: process.stdout,
    errorStream: process.stderr,
    writeLevel: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR',
    ci: true
});
ui.writeLevelVisible('DEBUG' || 'INFO' || 'WARNING' || 'ERROR');

const prefix = `${consoleColors.FgBlue}[${consoleColors.FgCyan}GHIDORAH - ${consoleColors.Reset}`

module.exports.log = async function (type, message) {
    switch (type) {
        case "startProgress": {
            ui.startProgress(message);
        }
        break;
        case "stopProgress": {
            ui.stopProgress();
        }
        break;
        case "INFO": {
            ui.writeInfoLine(`${prefix}${consoleColors.FgGreen}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "WARN": {
            ui.writeWarnLine(`${prefix}${consoleColors.FgYellow}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "ERROR": {
            ui.writeErrorLine(`${prefix}${consoleColors.FgRed}${type}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "DEBUG": {
            ui.writeDebugLine(`${prefix}${consoleColors.FgRed}${consoleColors.Blink}${type}${consoleColors.Reset}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        case "DELETE": {
            console.log(`${prefix}${consoleColors.BgRed}${consoleColors.Blink}${type}${consoleColors.Reset}${consoleColors.FgBlue}] ${consoleColors.FgMagenta}${message}${consoleColors.Reset}`);
        }
        break;
        default:
            ui.writeDeprecateLine(consoleColors.FgRed + 'Invalid logger: ' + type + `${consoleColors.Reset}`, true);
        break;
    }
}

module.exports.prompt = async function (object, callback) {
    await ui.prompt(object, callback);
}