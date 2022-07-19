const lxc = require('lxc-query');

/**
 * Aliases api
 * @param {*} callback 
 */

module.exports.getAllAliases = async function() {
    return await lxc.images.aliases.list('local');
}

module.exports.getAliases = async function(alias, callback) {
    await lxc.images.aliases.list('local', alias)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.createAlias = async function(data, callback) {
    await lxc.images.aliases.create('local', data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.replaceAlias = async function(data, callback) {
    await lxc.images.aliases.replace('local', data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.updateAlias = async function(name, data, callback) {
    await lxc.images.aliases.update('local', name, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.renameAlias = async function(oldName, newName, callback) {
    await lxc.images.aliases.rename('local', oldName, { name: newName })
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.deleteAlias = async function(name, callback) {
    await lxc.images.aliase.delete('local', name)
        .then(response => callback({status: true, data: { delete: true }}))
        .catch(error => callback({status: false, data: { delete: false }}));
}

/**
 * CERTIFICATES
 */

module.exports.getCertificates = async function(callback) {
    await lxc.certificates.list('local')
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.createCertificate = async function(data, callback) {
    await lxc.certificates.add('local', data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.getCertificate = async function(fingerprint, callback) {
    await lxc.certificates.info('local', fingerprint)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.replaceCertificate = async function(fingerprint, data, callback) {
    await lxc.certificates.replace('local', fingerprint, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.updateCertificate = async function(fingerprint, data, callback) {
    await lxc.certificates.update('local', fingerprint, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.replaceCertificate = async function(fingerprint, callback) {
    await lxc.certificates.delete('local', fingerprint)
        .then(response => callback({status: true, data: { delete: true }}))
        .catch(error => callback({status: false, data: { delete: false }}));
}

/** CONTAINERS */

module.exports.getContainers = async function () {
    return await lxc.containers.list('local');
}

module.exports.getContainer = async function (id, callback) {
    await lxc.containers.info('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.getContainerState = async function (id, callback) {
    await lxc.containers.getState('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.setContainerState = async function (id, data, callback) {
    await lxc.containers.setState('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.replaceContainer = async function (id, data, callback) {
    await lxc.containers.replace('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.updateContainer = async function (id, data, callback) {
    await lxc.containers.replace('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.renameContainer = async function (id, newId, callback) {
    await lxc.containers.rename('local', id, newId)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.createContainer = async function (id, data, callback) {
    await lxc.containers.create('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.startContainer = async function (id, callback) {
    await lxc.containers.start('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.stopContainer = async function (id, callback) {
    await lxc.containers.stop('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.restartContainer = async function (id, callback) {
    await lxc.containers.restart('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.freezeContainer = async function (id, callback) {
    await lxc.containers.freeze('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.unfreezeContainer = async function (id, callback) {
    await lxc.containers.unfreeze('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.deleteContainer = async function (id, callback) {
    await lxc.containers.delete('local', id)
        .then(response => callback({status: true, data: { delete: true }}))
        .catch(error => callback({status: false, data: { delete: false }}));
}

module.exports.execContainer = async function (id, data, callback) {
    await lxc.containers.exec('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

/**
 * FILES MANAGER
 */

module.exports.listFolders = async function (id, path, callback) {
    await lxc.files.list('local', id, path)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.pushFile = async function (id, path, localPath, callback) {
    await lxc.files.push('local', id, path, localPath)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.pullFile = async function (id, path, callback) {
    await lxc.files.pull('local', id, path)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

/**
 * IMAGES
 */

module.exports.listImages = async function (callback) {
    await lxc.images.list('local')
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.infoImage = async function (id, callback) {
    await lxc.images.info('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.replaceImage = async function (id, data, callback) {
    await lxc.images.replace('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.updateImage = async function (id, data, callback) {
    await lxc.images.update('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.deleteImage = async function (id, callback) {
    await lxc.images.delete('local', id)
        .then(response => callback({status: true, data: { delete: true }}))
        .catch(error => callback({status: false, data: { delete: false }}));
}

/** LOGS */

module.exports.listLogs = async function (id, callback) {
    await lxc.containers.logs.list('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.getLogs = async function (id, name, callback) {
    await lxc.containers.logs.get('local', id, name)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.delete = async function (id, callback) {
    await lxc.containers.logs.delete('local', id)
        .then(response => callback({status: true, data: { delete: true }}))
        .catch(error => callback({status: false, data: { delete: false }}));
}

/** METADATA */

module.exports.getMetadata = async function (id, callback) {
    await lxc.containers.metadata.get('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.replaceMetadata = async function (id, data, callback) {
    await lxc.containers.metadata.replace('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

/** NETWORK */

module.exports.listNetworks = async function (callback) {
    return await lxc.networks.list('local');
}

module.exports.infoNetwork = async function (id, callback) {
    await lxc.networks.info('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.createNetwork = async function (data, callback) {
    await lxc.networks.create('local', data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.replaceNetwork = async function (id, data, callback) {
    await lxc.networks.replace('local', id, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.renameNetwork = async function (id, newId, callback) {
    await lxc.networks.replace('local', id, newId, data)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.renameNetwork = async function (id, newId, callback) {
    await lxc.networks.replace('local', id, newId)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.deleteNetwork = async function (id, callback) {
    await lxc.networks.delete('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

/** OPERATIONS */

module.exports.listOperations = async function (callback) {
    await lxc.operations.list('local')
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.infoOperation = async function (id, callback) {
    await lxc.operations.info('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

module.exports.deleteOperation = async function (id, callback) {
    await lxc.operations.delete('local', id)
        .then(response => callback({status: true, data: response}))
        .catch(error => callback({status: false, data: error}));
}

/** SERVER */

module.exports.info = async function () {
    return await lxc.info('local');
}

module.exports.resources = async function () {
    return await lxc.server.resources('local');
}

module.exports.remotes = async function () {
    return await lxc.server.remotes();
}

module.exports.local = async function () {
    return await lxc.local('lxc list');
}