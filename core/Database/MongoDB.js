const mongoose = require("mongoose");

// GUILDS
const messagesSchema = require('./Models/Guild/Messages');
const memberSchema = require("./Models/Guild/Member");
const guildSchema = require("./Models/Guild/Guild");
const userSchema = require("./Models/Guild/User");
const rulesSchema = require("./Models/Guild/Rules");

// COMMONS
const entrySchema = require('./Models/Guild/Common/VerificationEntry');
const history = require('./Models/Guild/Common/History');
const userruleSchema = require('./Models/Guild/Common/UserRule');
const gameSchema = require('./Models/Guild/Common/Game');

//MODERATION
const verificationSchema = require("./Models/Guild/Moderation/Verification");
const blacklistSchema = require("./Models/Guild/Moderation/Blacklist");
const sanctionSchema = require("./Models/Guild/Moderation/Sanctions");
const moderatorSchema = require('./Models/Guild/Moderation/Moderators');

// SECURITY

const securitySchema = require('./Models/Guild/Security/Application');
const payloadSchema = require('./Models/Guild/Security/Payload/Payload');
const permissionsSchema = require('./Models/Guild/Security/Permissions/Permissions');
const requestSchema = require('./Models/Guild/Security/Permissions/Request');
const developersSchema = require('./Models/Guild/Security/Permissions/Developers');
const activitySchema = require('./Models/Guild/Security/Activity');

// SERVICE

const serviceSchema = require('./Models/Guild/Service');

const { v4 } = require('uuid');

module.exports.fetchUser = async function(key) {
    let userDB = await userSchema.findOne({ id: key });
    if (userDB) {
        return userDB;
    } else {
        userDB = new userSchema({
            id: key,
            registeredAt: Date.now(),
            stats: {
                online: {
                    total_time: 0,
                    last_connection: new Date()
                },
                stats: {
                    level: 0,
                    experience: 0,
                    money: 500,
                    kills: 0,
                    deaths: 0,
                    wins: 0,
                    fights: 0,
                    blocks: {
                        placed: 0,
                        broken: 0
                    }
                },
                versions: [],
                skin: false,
                cape: false
            }
        });
        await userDB.save().catch(err => console.error(err));
        return userDB;
    }
}

module.exports.fetchGuild = async function(key) {
    let guildDB = await guildSchema.findOne({ id: key });
    
    if (guildDB) {
        return guildDB;
    } else {
        guildDB = new guildSchema({
            id: key,
            registeredAt: Date.now()
        });
        await guildDB.save().catch(err => console.error(err));
        return guildDB;
    }
}

module.exports.deleteGuild = async function (guildId) {
    return await guildSchema.deleteOne({ id: guildId });
}

module.exports.fetchMember = async function(userID, guildID) {
    let member = await memberSchema.findOne({ id: userID, guildID: guildID });

    if (member) {
        return member;
    } else {
        client.users.fetch(userID).then(async (user) => {
            member = new memberSchema({
                id: userID,
                guildID: guildID,
                registeredAt: Date.now(),
                iconURL: (user.avatarURL() === null ? 'https://cdn.discordapp.com/attachments/973889644401930240/982491991260680292/blank-profile-picture-973460__340.webp' : user.avatarURL()),
                username: user.username
            });
            await member.save().catch(err => console.error(err));
            return member;
        });
    }
}

module.exports.updateMember = async function(userID, guildID) {
    client.users.fetch(userID).then(async (user) => {
        return await memberSchema.updateOne({ guildID: guildID, id: userID }, {
            id: userID,
            guildID: guildID,
            registeredAt: Date.now(),
            iconURL: (user.avatarURL() === null ? 'https://cdn.discordapp.com/attachments/973889644401930240/982491991260680292/blank-profile-picture-973460__340.webp' : user.avatarURL()),
            username: user.username
        }, { upsert: true});
    });
}

module.exports.fetchAllMember = async function(guildID) {
    return await memberSchema.find({ guildID: guildID});
}

module.exports.deleteMember = async function( userid ) {
    return await memberSchema.deleteMany({ id: userid });
}

module.exports.fetchSanction = async function(userId, guildId, active) {
    return await sanctionSchema.findOne({ id: userId, guildId: guildId , user: { active: active } });
}

module.exports.createSanction = async function(userID, guildId, data) {
    let oauth = new sanctionSchema({
        id: userID,
        guildId: guildId,
        data: {
            username: data.username,
            reason: data.reason,
            by: data.author,
            expirationDate: data.expirationDate,
            type: data.type,
            active: true
        }
    });
    await oauth.save().catch(err => console.error(err));
    return oauth;
}

module.exports.updateSanction = async function(userId, guildId, data) {
    return await sanctionSchema.updateOne({ id: userId, guildId: guildId, user: { active: true } }, data, {});
}

// BLACKLIST 

module.exports.isBlacklisted = async function(userID) {
    return await blacklistSchema.findOne({ id: userID });
}

module.exports.disableBlacklist = async function(userID) {
    return await blacklistSchema.updateOne({ id: userID, guildId: guildId }, { data: { active: false } }, {  });
}

module.exports.getAllBlacklist = async function () {
    return await blacklistSchema.find({  });
}

module.exports.createBlacklist = async function(userID, guildId, data) {
    let blacklist = new blacklistSchema({
        id: userID,
        guildId: guildId,
        data: {
            targetId: data.targetId,
            authorId: data.authorId,
            reason: data.reason,
            action: data.action,
            active: true
        }
    });
    await blacklist.save().catch(err => console.error(err));
    return blacklist;
}

// VERIFICATION

module.exports.createVerification = async function(userID, data) {
    let oauth = await verificationSchema.findOne({ id: userID, guildId: data.guildId });

    if (oauth) {
        return oauth;
    } else {
        let sniff = client.Modlog.generateCode();
        oauth = new verificationSchema({
            id: userID,
            guildId: data.guildId, 
            registeredAt: Date.now(),

            code: sniff,

            verified: false,
            verifiedId: null,

            data: data
        });
        await oauth.save().catch(err => console.error(err));
        return oauth;
    }
}

module.exports.fetchVerify = async function(userID, guildId) {
    return await verificationSchema.findOne({ id: userID, guildId: guildId });
}

module.exports.fetchAllVerify = async function(guildId) {
    return await verificationSchema.find({ guildId: guildId });
}


module.exports.fetchVerifyByName = async function(username, guildId) {
    return await verificationSchema.findOne({ guildId: guildId, user: { username: username } });
}

module.exports.getVerifyByCode = async function(token) {
    return await verificationSchema.findOne({ code: token, verified: false });
}

module.exports.getVerifyById = async function(verifiedId, guildId) {
    return await verificationSchema.findOne({ verifiedId: verifiedId, guildId: guildId, verified: true });
}

module.exports.updateVerify = async function(userID) {
    return await verificationSchema.updateOne({ id: userID, verified: false }, { verified: true }, {});
}

module.exports.updateVerifyByID = async function(userID, guildID, id) {
    return await verificationSchema.updateOne({ id: userID, guildId: guildID }, { verifiedId: id }, {});
}

module.exports.updateVerifyData = async function(userID, guildId, data) {
    return await verificationSchema.updateOne({ id: userID, guildId: guildId }, { data: data }, {});
}


// MESSAGES

module.exports.createMessage = async function (data) {
    let message = messagesSchema({
        id: data.userId,
        guild: data.guildId,
        registeredAt: Date.now(),

        messageId: data.messageId,
        messageContent: data.content
    });
    await message.save().catch((err) => client.logger.log('ERROR', `Error occcurred: ${err}`));
    return message;
}

module.exports.countMessages = async function (options = {}) {
    if (options.server_id)
        return await messagesSchema.find({  guild: options.server_id  });
    else if (options.server_id && options.userId)
        return await messagesSchema.find({  guild: options.server_id, id: options.userId }).count();
    else 
        return await messagesSchema.find({  });
}

module.exports.countMessagesInt = async function () {
    await messagesSchema.find({  }).count({  }, (error, result) => {
        if (error) return 0;
        return parseInt(result);
    });
}


module.exports.fetchMessage = async function (messageId) {
    return await messagesSchema.findOne({ messageId: messageId });
}

module.exports.generateGraphMessages = async function (guildId, callback) {}

module.exports.fetchMessageByUser = async function (userId) {
    return await messagesSchema.find({ id: userId });
}

module.exports.fetchRules = async function (guildId) {
    return await rulesSchema.findOne({ guildId: guildId });
}

module.exports.createRules = async function (guildId, data) {
    const create = await rulesSchema({
        guildId: guildId,
        rules: data,
        active: true
    });
    create.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return create;
}

module.exports.fetchApplication = async function (token) {
    return await securitySchema.findOne({ token: token });
}

module.exports.fetchApplications = async function () {
    return await securitySchema.find({  });
}

module.exports.createDefaultApplication = async function (data = {}, callback = {}) {
    let application = await securitySchema.findOne({ appName: data.appName });

    if (application) {
        return application;
    } else {
        application = securitySchema({
            appName: data.appName,
            appDescription: data.appDescription, 
            appEnabled: data.appEnabled,
            token: v4(),

            auth: {
                accessToken: v4(),
                refreshToken: v4(),
                issuer: data.issuer
            },

            registeredAt: Date.now()
        });
        application.save().then(() => {
            callback({status: true, data: application})
        }).catch(() => {
            callback({status: false, data: {}})
        });
    }
}

module.exports.payloadRequest = async function (payload = {},
                                                authentication = {}, 
                                                callback = {}) {
    const payloads = payloadSchema({
        payloadId: v4(),
        payloadKey: payload.key,
        payloadExpiration: payload.expiration,

        accessToken: authentication.accessToken,
        refreshToken: authentication.refreshToken,
        registeredAt: Date.now(),

        payloadData: payload.data
    });
    payloads.save().then(() => {
        callback({status: true, data: payload});
    }).catch(() => {
        callback({status: false, data: {}});
    });
}

module.exports.payloadPermissions = async function (payloadKey, accessToken, refreshToken) {
    return await permissionsSchema.findOne({ $eq: {
        permissionKey: payloadKey,
        auth: {
            accessToken: accessToken, 
            refreshToken: refreshToken
        }
    }});
}

module.exports.createPermission = async function (key, auth = {}, callback) {
    const permission = permissionsSchema({
        permissionId: v4(), 
        permissionKey: key, 
        bypass: false,
    
        auth: { type: Object, default: {
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            issuer: 'GHIDORAH',
            expiration: -1
        }},
        registeredAt: Date.now()
    });
    permission.save().then(() => {
        callback({
            permissionKey: key,
            status: 'CREATED'
        });
    }).catch(err => {
        callback({
            permissionKey: key,
            status: 'REJECTED'
        });
    });
}

module.exports.createEntry = async function (guildId, userId) {
    let entry = entrySchema({
        guildId: guildId,
        id: userId,
        registeredAt: Date.now()
    });
    entry.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return entry;
}

module.exports.checkEntry = async function (guildId, userId) {
    return await entrySchema.findOne({ guildId: guildId, id: userId });
}

module.exports.deleteEntry = async function (guildId, userId) {
    await entrySchema.deleteOne({ guildId: guildId, id: userId });
}

module.exports.getAllEntries = async function (guildId) {
    return await entrySchema.find({ guildId: guildId });
}

module.exports.countVerify = async function (guildId) {
    await entrySchema.find({ guildId: guildId }).count({}, (error, result) => {
        if (error) return 0;
        return parseInt(result);
    });
}

module.exports.isDeveloper = async function (userId, callback) {
    const developer = await developersSchema.findOne({ userId: userId });
    if (developer)
        callback({ status: true, isDev: true, level: developer.permissionLevel });
    else
        callback({ status: false, isDev: false, level: 0 });
}

module.exports.addDeveloper = async function (userId, permissionLevel = "4") {
    const developer = developersSchema({
        userId: userId,
        permissionLevel: permissionLevel,
        registeredAt: Date.now()
    });
    developer.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return developer;
}

module.exports.isAllowed = async function (token) {
    return await requestSchema.findOne({ appToken: token });
}

module.exports.createHistory = async function (data) {
    if (data.session === null) return;

    const his = history({
        requestId: v4(),

        remoteIp: data.remoteIp,
        route: data.route,
        method: data.method,
        headers: data.headers,
        body: data.body,
        session: data.session, 
    
        registeredAt: Date.now()
    });
    his.save();
}

module.exports.acceptRules = async function (userId, serverId) {
    const rule = userruleSchema({
        userId: userId,
        serverId: serverId,

        ruleAccepted: true, 

        registeredAt: Date.now()
    });
    rule.save().catch(err => client.logger.log('ERROR', `Error occurred ${err}`));
    return rule;
}

module.exports.fetchUserRule = async function (userId, serverId) {
    return await userruleSchema.findOne({ userId: userId, serverId: serverId });
}

// MODERATOR

module.exports.fetchModerator = async function (userId, serverId) {
    return await moderatorSchema.findOne({ 
        userId: userId,
        serverId: serverId
    });
}

module.exports.createModerator = async function (userId, serverId, accessLevel = 1) {
    const moderator = moderatorSchema({
        userId: userId,
        serverId: serverId,

        accessLevel: accessLevel,

        registeredAt: Date.now()
    });
    moderator.save().catch(err => client.logger.log('ERROR', `Error occurred ${err}`));
    return moderator;
}

module.exports.deleteModerator = async function (userId, serverId) {
    return await moderatorSchema.deleteOne({
        userId: userId,
        serverId: serverId
    });
}

module.exports.updateModerator = async function (userId, serverId, accessLevel = 1) {
    return await moderatorSchema.updateOne({ 
        userId: userId, 
        serverId: serverId
    }, { accessLevel: accessLevel }, {});
}

module.exports.fetchActivity = async function (serverId) {
    return await activitySchema.find({ serverId: serverId }, null, { 
        limit: 5, 
        sort: { 
            'registeredAt': -1 // FIND THE LATEST DOCUMENTS
        }
    });
}

module.exports.createActivity = async function (username, serverId, type, action) {
    const activity = activitySchema({
        userId: username,
        serverId: serverId,

        type: type,
        action: action,

        registeredAt: Date.now()
    });
    activity.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return activity;
}

module.exports.fetchService = async function (clientId) {
    return await serviceSchema.findOne({ clientId: clientId });
}

module.exports.createService = async function (data = {}) {
    const service = await serviceSchema({
        clientId: v4(),
        serviceName: data.name,
        restricted: false,
        scopes: data.scopes,
        options: {
            successCallback: data.successCallback,
            errorsCallback: data.errorCallback
        }
    });
    service.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`))
    return service;
}

module.exports.fetchAllGames = async function (protocol) {
    return await gameSchema.find({ protocol: protocol });
}

module.exports.fetchGame = async function (gameId) {
    return await gameSchema.findOne({ _id: new mongoose.Types.ObjectId(gameId)});
}

module.exports.deleteGame = async function (gameId) {
    return await gameSchema.deleteOne({ _id: new mongoose.Types.ObjectId(gameId)});
}

module.exports.createGame = async function (gameData = {}) {
    const game = gameSchema({
        gameName: gameData.name,
        protocol: gameData.protocol,
        serverIp: gameData.ip,

        issuer: gameData.issuer,
        registeredAt: new Date()
    });
    game.save().then((result) => {
        return result;
    }).catch((err) => client.logger.log('error', `An error occurred, ${err}`));
}