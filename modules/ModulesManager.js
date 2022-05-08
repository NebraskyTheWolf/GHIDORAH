const Discord = require('discord.js');

module.exports.getModuleById = async function (guildId, id) {
    return client.modules.get(`${guildId}_${id}`);
}

module.exports.loadModuleById = async function (guildId, id) {
    let module = client.modules.get(`${guildId}_${id}`);

    if (module.data.active) {
        console.log(``)
    } else {
        console.log(`[ModuleManager] Module ${id} unable to load for guildId: ${guildId}.`);
    }
};

module.exports.unloadModuleById = async function (guildId, id) {
    
};

module.exports.getModules = async function (guildId) {
    
};

module.exports.createServer = async function (guildId, info) {

};

module.exports = {
    className: 'ModuleManager',
    info: {
        version: 00012,
        experimental: true
    }
}