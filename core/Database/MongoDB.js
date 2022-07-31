const Discord = require('discord.js');

// GUILDS
const messagesSchema = require('./Models/Guild/Messages');
const memberSchema = require("./Models/Guild/Member");
const guildSchema = require("./Models/Guild/Guild");
const userSchema = require("./Models/Guild/User");
const rulesSchema = require("./Models/Guild/Rules");
const commitSchema = require('./Models/Guild/Commit');
const pinngerSchema = require('./Models/Guild/APIPing');

// COMMONS
const giveawaysSchema = require('./Models/Guild/Common/Giveaways');
const factionSchema = require("./Models/Guild/Common/Faction");
const modulesSchema = require('./Models/Guild/Common/Modules');
const oauthSchema = require("./Models/Guild/Common/Oauth");
const socialSchema = require("./Models/Guild/Common/Social");
const entrySchema = require('./Models/Guild/Common/VerificationEntry');
const marrySchema = require('./Models/Guild/Common/Marry');
const history = require('./Models/Guild/Common/History');
const userruleSchema = require('./Models/Guild/Common/UserRule');

// COMMONS/ROLES
const rolesSchema = require('./Models/Guild/Common/Roles/Roles');
const categorySchema = require('./Models/Guild/Common/Roles/Category');
const selectedSchema = require('./Models/Guild/Common/Roles/Selected');

//MODERATION
const verificationSchema = require("./Models/Guild/Moderation/Verification");
const blacklistSchema = require("./Models/Guild/Moderation/Blacklist");
const sanctionSchema = require("./Models/Guild/Moderation/Sanctions");
const usermailSchema = require('./Models/Guild/Moderation/Usermail');
const modmailSchema = require('./Models/Guild/Moderation/Modmail');
const moderatorSchema = require('./Models/Guild/Moderation/Moderators');

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
const requestSchema = require('./Models/Guild/Security/Permissions/Request');
const developersSchema = require('./Models/Guild/Security/Permissions/Developers');
const authSchema = require('./Models/Guild/Security/Authentication');
const activitySchema = require('./Models/Guild/Security/Activity');

// SOCIALS

const youtuberSchema = require('./Models/Guild/Socials/Youtube/Youtubers');
const videosSchema = require('./Models/Guild/Socials/Youtube/VideoCheck');
const casesSchema = require('./Models/Guild/Socials/Case');

// MINECRAFT

const playerSchema = require('./Models/Minecraft/Server/Player/Player');

// VIP
const vipUserSchema = require('./Models/Guild/VIP');

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

module.exports.createOauth = async function(userID, data) {
    let oauth = await oauthSchema.findOne({ id: userID, activated: false });

    if (oauth) {
        return oauth;
    } else {
        oauth = new oauthSchema({
            id: userID,
            serverId: data.serverId,
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

module.exports.fetchOauthByOID = async function(oid) {
    return await oauthSchema.findOne({ _id: ObjectId(oid) });
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

module.exports.countMessagesInt = async function () {
    await messagesSchema.find({  }).count({  }, (error, result) => {
        if (error) return 0;
        return parseInt(result);
    });
}


module.exports.fetchMessage = async function (messageId) {
    return await messagesSchema.findOne({ messageId: messageId });
}

module.exports.fetchMessageByUser = async function (userId) {
    return await messagesSchema.find({ id: userId });
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

// MINECRAFT 

module.exports.getPlayer = async function (uuid) {
    return playerSchema.findOne({ uuid: uuid });
}

module.exports.createPlayer = async function (data) {
    let player = playerSchema({
        uuid: data.uuid,
        name: data.name,
        nickname: null,
        coins: 500,
        stars: 16,
        powders: 0,
        last_login: Date.now(),
        first_login: Date.now(),
        last_ip: data.ip,
        topTpKey: null,
        group_id: 1
    });
    player.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return player;
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

module.exports.isMarried = async function (userId, callback) {
    const marrySelf = await marrySchema.findOne({ userId: userId });
    const marry = await marrySchema.findOne({ targetId: userId });

    if (marry) {
        callback({
            status: true,
            data: marry
        });
    } else if (marrySelf) {
        callback({
            status: true,
            data: marrySelf
        });
    } else {
        callback({
            status: false,
            data: []
        });
    }
}

module.exports.addMarriage = function (userId, targetId, callback) {
    const marry = marrySchema({
        id: v4(),
        
        userId: userId,
        targetId: targetId,

        status: 'waiting',
        registeredAt: Date.now()
    });
    marry.save()
    .then(result => callback({status: true, data: marry}))
    .catch(err => callback({status: false, data: {}}));
}

module.exports.updateMarriage = async function (marryId, status) {
    if (status === 'accepted')
        return await marrySchema.updateOne({ id: marryId }, { status: status, registeredAt: Date.now() }, { upsert: false });
    else if (status === 'denied')
        return await marrySchema.deleteOne({ id: marryId });
    else
        client.logger.log('WARN', `Marry status: ${status} invalid. ( UPDATE_CANCELLED )`);
}

module.exports.getMarriageByID = async function (marryId, callback) {
    const marry = await marrySchema.findOne({ id: marryId });
    if (marry) {
        callback({ status: true, data: marry });
    } else {
        callback({ status: false, data: {} });
    }
}

module.exports.checkYoutubeVideo = async function (guildId, url) {
    return await videosSchema.findOne({ guildId: guildId, videoURL: url });
}

module.exports.createYoutubeVideo = async function (guildId, url) {
    const video = videosSchema({
        videoId: v4(),
        guildId: guildId,
        videoURL: url,
        registeredAt: Date.now()
    });
    video.save()
    .catch(error => client.logger.log('ERROR', `Error occurred: ${error}`));
    return video;
}

module.exports.getAllYoutubers = async function () {
    return await youtuberSchema.find({ });
}

module.exports.getGuildYoutubers = async function (guildId) {
    return await youtuberSchema.find({ guildId: guildId });
}

module.exports.getYoutuberByID = async function (guildId, youtuberId) {
    return await youtuberSchema.findOne({ guildId: guildId, youtuberId: youtuberId });
}

module.exports.createYoutuber = async function (guildId, data) {
    const youtuber = youtuberSchema({
        youtuberId: v4(),
        userId: data.userId,
        guildId: guildId,

        channelURL: data.url,
        registeredAt: Date.now()
    });
    youtuber
    .save()
    .catch(error => client.logger.log('ERROR', `Error occurred: ${error}`));
    return youtuber;
}

module.exports.getCaseByID = async function (id) {
    return await casesSchema.findOne({ _id: id });
}

module.exports.isVip = async function (userId) {
    const vip = await vipUserSchema.findOne({ userId: userId });

    if (vip) {
        return true;
    } else {
        return false;
    }
}

// AUTHENTICATION

module.exports.isAuthentified = async function (userId, accessToken) {
    const authentication = await authSchema.findOne({ userId: userId, auth: { accessToken: accessToken } });
    if (authentication)
        return authentication.status === 'ALLOWED' ? true : false;
}

module.exports.getCurrentAuthStatus = async function (userId, accessToken) {
    const authentication = await authSchema.findOne({ userId: userId, auth: { accessToken: accessToken } });
    if (authentication)
        return authentication.status;
}

module.exports.updateAuthentication = async function (userId, accessToken, status) {
    return authSchema.updateOne({ userId: userId, auth: { accessToken: accessToken } }, {
        status: status
    });
}

module.exports.createAuthentication = async function (userId, data = {}) {
    const authentication = authSchema({
        userId: userId,
        status: 'WAITING',
        requestHash: v4(),

        auth: {
            accessToken: v4(),
            refreshToken: v4()
        },

        registeredAt: Date.now()
    });
    authentication.save().catch(err => client.logger.log('ERROR', `Error occurred ${err}`));
    return authentication;
} 

module.exports.removeAuthentication = async function (userId, accessToken) {
    return await authSchema.deleteOne({ userId: userId, auth: { accessToken: accessToken } });
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

module.exports.createCommit = async function (data) {
    const commit = commitSchema({
        id: v4(),
        data: data
    });
    commit.save();
    return commit;
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

module.exports.fetchPings = async function () {
    return await pinngerSchema.find({}, null, {
        limit: 7,
        sort: {
            'registeredAt': -1
        }
    });
}

module.exports.recordPing = function(latency, service) {
    const ping = pinngerSchema({
        ms: latency,
        service: service,
        registeredAt: Date.now()
    });
    ping.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
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

// ROLES

module.exports.fetchRoles = async function (serverId) {
    return await rolesSchema.find({ serverId: serverId }, null, {
        sort: {
            'registeredAt': 1
        }
    });
}

module.exports.fetchRoleById = async function (roleId) {
    return await rolesSchema.findOne({ _id: ObjectId(roleId) });
}

module.exports.createRole = async function (serverId, categoryId, role = {}) {
    const roles = rolesSchema({
        serverId: serverId,
        role: {
            categoryId: categoryId,
            roleName: role.name,
            roleId: role.id
        },

        registeredAt: Date.now()
    });
    roles.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return roles;
}

module.exports.fetchCategories = async function (serverId) {
    return await categorySchema.find({ serverId: serverId }, null, {
        sort: {
            'registeredAt': 1
        }
    });
}

module.exports.fetchCategoryById = async function (categoryId) {
    return await categorySchema.findOne({ _id: ObjectId(categoryId) });
}

module.exports.createCategory = async function (serverId, category = {}) {
    const category = categorySchema({
        serverId: serverId,
        category: {
            label: category.label,
            description: category.description,
            min_value: category.min_value,
            max_value: category.max_value
        },
        registeredAt: Date.now()
    });
    category.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return category;
}

module.exports.fetchSelected = async function (serverId, userId) {
    return await selectedSchema.find({ serverId: serverId, userId: userId }, null, { 
        sort: {
            'registeredAt': -1
        }
    });
}

module.exports.createSelection = async function (serverId, userId, roleId) {
    const selection = selectedSchema({
        serverId: serverId,
        userId: userId,
        roleId: roleId,

        registeredAt: Date.now()
    });
    selection.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return selection;
}