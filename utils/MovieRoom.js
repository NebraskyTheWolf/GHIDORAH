const { v4 } = require('uuid');
const fingerprints = require('key-fingerprint');

const roomChannel = process.env.ROOM_NETWORK;
const URI = `${roomChannel}/${roomId}`;

module.exports.findRoomByID = async function(roomId, options = {}, callback) {
    await client.redis.publish(`${URI}/${roomId}/payload`, 'ACK_REFRESH'); // UPDATING DATA BEFORE THE GETTER

    await client.redis.get(`${URI}/${roomId}/data`)
        .then((data) => callback({status: true, options: options, data: data}))
        .catch((err) => callback({status: false, error: err}));
}

module.exports.createRoom = async function (data = {}, options = {}, callback) {
    let VLAN = client.Modlog.generateVLAN({ prefix: 69 });

    await client.redis.set(`${URI}/${data.roomId}/data`, {
        ownerId: data.ownerId,
        manifest: [],
        members: [],
        intents: [],
        vmData: [],
        fingerprints: fingerprints(process.env.PUBLIC_KEY, { encoding: 'hex', algorithm: 'sha512' }),
    });
    await client.redis.set(`${URI}/${data.roomId}/manifest`, {
        status: 'OFFLINE',
        terminated: false,
        servers: []
    });
    await client.redis.publish(`${URI}/${data.roomId}/payload`, {
        type: 'ROOM_CREATION',
        data: data,
        linkedVM: ''
    });
}

module.exports.fetchRooms = async function (options = {}, callback) {}

module.exports.networkAck = async function (data = {}, options = {}, callback) {}