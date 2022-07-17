const { v4 } = require('uuid');
const { fingerprint } = require('key-fingerprint');

const roomChannel = process.env.ROOM_NETWORK;
const URI = `${roomChannel}`;

module.exports.findRoomByID = async function(roomId, options = {}, callback) {
    await client.redis.publish(`${URI}/${roomId}/payload`, 'ACK_REFRESH'); // UPDATING DATA BEFORE THE GETTER

    await client.redis.get(`${URI}/${roomId}/data`)
        .then((data) => callback({status: true, options: options, data: data}))
        .catch((err) => callback({status: false, error: err}));
}

module.exports.createRoom = async function (data = {}, options = {}, callback) {
    let VLAN = client.Modlog.generateVLAN({ prefix: 68 });

    const fuckmedaddy = {
        ownerId: data.ownerId,
        manifest: [
            {
                status: 'OFFLINE',
                terminated: false,
                servers: VLAN
            }
        ],
        members: [],
        intents: [
            {
                name: 'CONNECT_FRAMES',
                value: 0x1
            }
        ],
        networkVlan: VLAN,
        fingerprints: fingerprint(`${process.env.PUBLIC_KEY}`, 'sha256', true),
    };

    await client.redis.set(`${URI}/${data.roomId}/data`, fuckmedaddy);
    
    await client.redis.publish(`${URI}/${data.roomId}/payload`, {
        type: 'ROOM_CREATION',
        data: data,
        linkedVM: `${VLAN}/vm`
    });
    await client.redis.publish('vlanManager', {
        type: 'CREATE_VLAN',
        IP: VLAN,
        duration: 20000000,
        roomId: data.roomId
    });

    callback({status: true, data: fuckmedaddy});
}

module.exports.fetchRooms = async function (options = {}, callback) {}

module.exports.networkAck = async function (data = {}, options = {}, callback) {}