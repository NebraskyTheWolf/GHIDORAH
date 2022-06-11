module.exports.handle = async function(application = {}, data = {}, callback = {}) {
    callback({
        statusCode: 'REJECTED',
        keychains: {},
        fingerprints: {},

        data: {}
    });
}