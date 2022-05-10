const Discord = require('discord.js');
const fs = require('fs');

module.exports.getModuleById = async function (guildId, id) {
    return client.modules.get(`${guildId}_${id}`);
}

module.exports.loadModuleById = async function (guildId, id) {
    let module = client.modules.get(`${guildId}_${id}`);

    if (!module.has('enabled')) {
        module.execute({
            guildId: guildId,
            moduleId: id
        });
        module.dataDB({
            enabled: true
        });
        client.logger.log('INFO', `Module ${id} successfully enabled for ${guildId}.`);
    } else {
        client.logger.log('ERROR', `Module ${id} unable to load for guildId: ${guildId}.`);
    }
};

module.exports.unloadModuleById = async function (guildId, id) {
    let module = client.modules.get(`${guildId}_${id}`);

    if (module.has('enabled')) {
        module.shutdown({
            guildId: guildId
        });
        module.dataDB({
            enabled: false
        });
        client.logger.log('INFO', `Module ${id} successfully disabled for ${guildId}.`);
    } else {
        client.logger.log('ERROR', `Module ${id} unable to unload for guildId: ${guildId}.`);
    }
};

module.exports.getModules = async function (guildId) {
    let modules = new Discord.Collection();
    for (module in client.modules)
        if (module.has('guildId') === guildId)
            modules.set(module.id, module);
    return modules;
};

module.exports.createServer = async function (guildId, info) {
    fs.existsSync(`./server/${guildId}`).then(() => {
        client.logger.log('WARN', `Unable to createServer: ${guildId}. Server already created.`);
    }).catch(() => {
        fs.mkdirSync(`./server/${guildId}`).then(() => client.logger.log('INFO', `Server ${guildId} created.`));
    });
};

module.exports = {
    className: 'ModuleManager',
    info: {
        version: 00012,
        experimental: true
    }
}