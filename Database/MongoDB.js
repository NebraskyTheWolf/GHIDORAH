const Discord = require('discord.js');

// GUILDS
const messagesSchema = require('./Models/Guild/Messages');
const memberSchema = require("./Models/Guild/Member");
const guildSchema = require("./Models/Guild/Guild");
const userSchema = require("./Models/Guild/User");
const rulesSchema = require("./Models/Guild/Rules");

// COMMONS
const giveawaysSchema = require('./Models/Guild/Common/Giveaways');
const factionSchema = require("./Models/Guild/Common/Faction");
const modulesSchema = require('./Models/Guild/Common/Modules');
const oauthSchema = require("./Models/Guild/Common/Oauth");
const socialSchema = require("./Models/Guild/Common/Social");


//MODERATION
const verificationSchema = require("./Models/Guild/Moderation/Verification");
const blacklistSchema = require("./Models/Guild/Moderation/Blacklist");
const sanctionSchema = require("./Models/Guild/Moderation/Sanctions");
const usermailSchema = require('./Models/Guild/Moderation/Usermail');
const modmailSchema = require('./Models/Guild/Moderation/Modmail');

// EVENTS
const usereventSchema = require('./Models/Events/Userevent');
const eventsSchema = require('./Models/Events/Events');

// BANK 
const transactionSchema = require('./Models/Bank/server/Transactions');
const manifestsSchema = require('./Models/Bank/server/Manifests');
const nodesSchema = require('./Models/Bank/server/Nodes');

const accountsSchema = require('./Models/Bank/client/Account');
const cardsSchema = require('./Models/Bank/client/Card');

// SECURITY

const securitySchema = require('./Models/Guild/Security/Application');
const payloadSchema = require('./Models/Guild/Security/Payload/Payload');
const permissionsSchema = require('./Models/Guild/Security/Permissions/Permissions');


const { v4 } = require('uuid');
const { client } = require('tmi.js');

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

module.exports.deleteMember = async function(guildID, userid) {
    return await memberSchema.deleteOne({ guildID: guildID, id: userid});
}


module.exports.createOauth = async function(userID, data) {
    let oauth = await oauthSchema.findOne({ id: userID });

    if (oauth) {
        return oauth;
    } else {
        oauth = new oauthSchema({
            id: userID,
            registeredAt: Date.now(),
            key: v4(),
            user: {
                username: data.username,
                roles: data.roles,
                avatar: data.avatar,
                banner: data.banner,
                discriminator: data.discriminator,
                permissions: data.permissions,
                system: data.system,
                bot: data.bot
            }
        });
        await oauth.save().catch(err => console.error(err));
        return oauth;
    }
}

module.exports.fetchOauth = async function(userID) {
    return await oauthSchema.findOne({ id: userID });
}

module.exports.fetchAllOauth = async function(callback) {
    return await oauthSchema.find({ }).then((results) => callback(results))
}


module.exports.fetchOauthByName = async function(username) {
    return await oauthSchema.findOne({ user: { username: username } });
}

module.exports.getUserByToken = async function(token) {
    return await oauthSchema.findOne({ key: token });
}

module.exports.activateOauth = async function(userID) {
    return await oauthSchema.updateOne({ id: userID, activated: false }, { activated: true }, {});
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

// FANCTION FETCHER

module.exports.fetchFactionById = async function(factionId) {
    return await factionSchema.findOne({ id: factionId });
}

module.exports.fetchFactionByOwner = async function(ownerId) {
    return await factionSchema.findOne({ faction: {  ownerId: ownerId  } });
}

module.exports.fetchFactionByName = async function(factionName) {
    return await factionSchema.findOne({ faction: {  name: factionName  } });
}

// FACTION UPDATER

module.exports.updateFactionById = async function(factionId, data) {
    return await factionSchema.findOne({ id: factionId, faction: data });
}

module.exports.updateFactionMoneyById = async function(factionId, amount) {
    return await factionSchema.findOne({ id: factionId, faction: { money: amount } });
}

module.exports.updateFactionPointsById = async function(factionId, amount) {
    return await factionSchema.findOne({ id: factionId, faction: { rankedPoints: amount } });
}

// CREATE FACTION

module.exports.createFaction = async function(data) {
    let faction = new factionSchema({
        id: v4(),
        guildId: data.guildId, 
        faction: {
            name: data.name,
            prefix: data.prefix,
            description: data.description,
            accentColour: data.accentColour,
            money: data.money,
            rankedPoints: data.rankedPoints,
            info: {
                fights: data.info.fights,
                wins: data.info.wins,
                lose: data.info.loses,
                kills: data.info.kills,
                damages: data.info.damages,
                blockBreak: data.info.blockBreak,
                blockPlace: data.info.blockPlace,
                resources: data.info.resources
            }
        }
    });
    await faction.save().catch(err => console.error(err));
    return faction;
}

// BLACKLIST 

module.exports.isBlacklisted = async function(userID) {
    return await blacklistSchema.findOne({ id: userID });
}

module.exports.disableBlacklist = async function(userID) {
    return await blacklistSchema.updateOne({ id: userID, guildId: guildId }, { data: { active: false } }, {  });
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

module.exports.fetchAllVerify = async function(guildId, callback) {
    return await verificationSchema.find({ guildId: guildId }).then((results) => callback(results))
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

// MODULES MANAGER

module.exports.createServer = async function(guildId) {
    let module = await modulesSchema.findOne({ guild: guildId });

    if (module) {
        return module;
    } else {
        module = modulesSchema({
            id: v4(),
            guild: guildId,
            
            modules: [
                {
                    id: v4(),
                    name: 'Core',
                    description: 'Main loader system',
                    category: 'System',
                    status: 'enabled',
                    option: {}
                }
            ]
        });
        await module.save().catch((err) => client.logger.log('ERROR', `Error occurred: ${err}`));
        return module;
    }
}

module.exports.fetchModule = async function(moduleId) {
    return await modulesSchema.findOne({ modules: [ { id: moduleId } ] });
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

module.exports.countMessagesInt = async function (options = {}) {
    await messagesSchema.find({ guild: options.server_id, id: options.userId }).count({}, (error, result) => {
        if (error) return 0;
        return parseInt(result);
    });
}


module.exports.fetchMessage = async function (messageId) {
    return await messagesSchema.findOne({ messageId: messageId });
}

// LEVELS

module.exports.addEXP = async function (id, amounts = 0) {
    const data = await memberSchema.findOne({ id: id });
    const newEXP = data.experience + amounts;  
    await memberSchema.updateOne({ id: id }, { experience: newEXP }, {});
};

module.exports.removeEXP = async function (id, amounts = 0) {
    const data = await memberSchema.findOne({ id: id });
    const newEXP = data.experience - amounts;  
    await memberSchema.updateOne({ id: id }, { experience: newEXP }, {});
};

module.exports.updateLevel = async function(id, level) {
    await memberSchema.updateOne({ id: id }, { level: level }, {});
}

// MOD MAIL

module.exports.createModmail = async function (guildid, data, callback) {
    const modmail = await modmailSchema.findOne({ guildId: guildid, data: { mainChannel: data.channelId } });

    if (modmail)
        callback({status: true, data: modmail});
    else {
        modmail = modmailSchema({
            id: v4(),
            guildId: guildid,
            registeredAt: Date.now(),

            data: {
                mainChannel: data.channelId,
                moderatorRole: data.moderatorRole,
                enabled: true
            }
        });
        await modmail.save().catch(err => client.logger.log('ERROR', `Error occurred ${err}`));
        callback({status: true, data: modmail});
    }
}

module.exports.fetchModmail = async function (guildid, channelid) {
    return await modmailSchema.findOne({ guildId: guildid, data: { mainChannel: channelid } });
}

module.exports.changeModmailState = async function (guildid, channelid, enabled) {
    return await modmailSchema.updateOne({ guildId: guildid, data: { mainChannel: channelid } }, { $set: { data: { enabled: enabled } } }, { upsert: true });
}

module.exports.deleteModmail = async function (guildid, channelid) {
    return await modmailSchema.deleteOne({ guildId: guildid, data: { mainChannel: channelid } });
}

// USER MAIL

module.exports.createMail = async function (guildid, datad) {
    let modmail = await usermailSchema.findOne({ guildId: guildid, data: { code: datad.code } });

    if (modmail)
        return modmail;
    else {
        modmail = usermailSchema({
            id: datad.userId,
            guildId: guildid,
            registeredAt: Date.now(),

            data: {
                code: datad.code,
                channelId: datad.channelId, 
                enabled: true
            }
        });
        await modmail.save().catch(err => client.logger.log('ERROR', `Error occurred ${err}`));
        return modmail;
    }
}

module.exports.fetchUsermail = async function (code) {
    return await usermailSchema.findOne({ data: { code: code }});
}

module.exports.changeUsermailState = async function (userId, code, enabled) {
    return await usermailSchema.updateOne({ id: userId, data: { code: code } }, { $set: { data: { enabled: enabled } } }, { upsert: true });
}

module.exports.deleteUsermail = async function (userId, code) {
    return await usermailSchema.deleteOne({ id: userId, data: { code: code } });
}

module.exports.createEvent = async function (manifest = {}, callback) {
    const event = eventsSchema({
        eventId: v4(),
        registeredAt: Date.now(),

        manifesy: manifest
    });
    await event.save().catch(err => client.logger.log('ERROR', `Error occurred : ${err}`));
    return event;
}

module.exports.fetchEvent = async function (eventId) {
    return await eventsSchema.findOne({ eventId: eventId });
}

module.exports.deleteEvent = async function (eventId) {
    return await eventsSchema.deleteOne({ eventId: eventId });
}

// TRANSACTIONS

module.exports.createTransaction = async function (data = {}, callback) {
    const transaction = transactionSchema(data);
    await transaction.save();
    await callback({status: true, data: transaction});
}

module.exports.fetchTransactionsByAccount = async function (accountId, callback) {
    const transaction = await transactionSchema.find({accountId: accountId});
    if (transaction)
        callback({status: true, data: transaction});
    else
        callback({status: false, data: {}});
}

module.exports.fetchTransactionsByBank = async function (bankId, callback) {
    const transaction = await transactionSchema.find({bankId: bankId});
    if (transaction)
        callback({status: true, data: transaction});
    else
        callback({status: false, data: {}});
}

module.exports.fetchTransactionsByUser = async function (userId, callback) {
    const transaction = await transactionSchema.find({userId: userId});
    if (transaction)
        callback({status: true, data: transaction});
    else
        callback({status: false, data: {}});
}

// MANIFESTS

module.exports.createBank = async function (data = {}, callback) {
    const bank = manifestsSchema(data);
    await bank.save();
    await callback({status: true, data: bank});
}

module.exports.fetchBankByID = async function (bankId, callback) {
    const bank = await manifestsSchema.find({bankId: bankId});
    if (bank)
        await callback({status: true, data: bank});
    else
        await callback({status: false, data: {}});
}

module.exports.fetchBankByIdentifier = async function (identifier, callback) {
    const bank = await manifestsSchema.find({identifier: identifier});
    if (bank)
        await callback({status: true, data: bank});
    else
        await callback({status: false, data: {}});
}

// NODES

module.exports.createNode = async function(data = {}, callback) {
    const node = await nodesSchema(data);
    await node.save();
    await callback({status: true, data: node});
}

module.exports.fetchRules = async function (guildId) {
    return await rulesSchema.findOne({ guildId: guildId });
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

// SOCIAL

module.exports.createSocial = async function (id, data = {}, callback = {}) {
    const social = await socialSchema.findOne({id: id, platform: data.platform});

    if (!social) {
        social = socialSchema({
            id: id,
            registeredAt: Date.now(),

            platform: data.platform,
            linked: true,

            refreshToken: data.refreshToken,
            accessToken: data.accessToken
        });
        await social.save().catch(err => client.logger.log('ERROR', 'Error occurred in `createSocial(a, b, v)` line #609'));
        return social;
    } else {
        callback({
            status: false,
            error: 'Account already registered.'
        });
    }
} 

module.exports.getSocialById = async function (userId, platform = 'twitch') {
    return await socialSchema.findOne({ id: userId, platform: platform, linked: true });
}

module.exports.updateSocial = async function (userId, platform = 'twitch', data = {}) {
    return await socialSchema.updateOne({ id: userId, platform: platform, linked: false }, { 
        linked: data.linked,
        refreshToken: data.refreshToken,
        accessToken: data.accessToken
    }, { upsert: false });
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