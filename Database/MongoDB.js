const Discord = require('discord.js');
const userSchema = require("./Models/User");
const guildSchema = require("./Models/Guild");
const memberSchema = require("./Models/Member");

const oauthSchema = require("./Models/Oauth");
const sanctionSchema = require("./Models/Sanctions");

const factionSchema = require("./Models/Faction");

const blacklistSchema = require("./Models/Blacklist");

const verificationSchema = require("./Models/Verification");

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

module.exports.fetchMember = async function(userID, guildID) {
    let member = await memberSchema.findOne({ id: userID, guildID: guildID });

    if (member) {
        return member;
    } else {
        member = new memberSchema({
            id: userID,
            guildID: guildID,
            registeredAt: Date.now()
        });
        await member.save().catch(err => console.error(err));
        return member;
    }
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

module.exports.fetchSanction = async function(userId, active) {
    return await sanctionSchema.findOne({ id: userId, user: { active: active } });
}

module.exports.createSanction = async function(userID, data) {
    let oauth = new sanctionSchema({
        id: userID,
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

module.exports.updateSanction = async function(userId, data) {
    return await sanctionSchema.updateOne({ id: userId, user: { active: true } }, data, {});
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
    return await blacklistSchema.updateOne({ id: userID }, { data: { active: false } }, {  });
}

module.exports.createBlacklist = async function(userID, data) {
    let blacklist = new blacklistSchema({
        id: userID,
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
    let oauth = await verificationSchema.findOne({ id: userID });

    if (oauth) {
        return oauth;
    } else {
        oauth = new oauthSchema({
            id: userID,
            registeredAt: Date.now(),
            code: `${client.Modlog.generateCode()}`,
            verified: false,
            verifiedId: null,
            data: data
        });
        await oauth.save().catch(err => console.error(err));
        return oauth;
    }
}

module.exports.fetchVerify = async function(userID) {
    return await verificationSchema.findOne({ id: userID });
}

module.exports.fetchAllVerify = async function(callback) {
    return await verificationSchema.find({ }).then((results) => callback(results))
}


module.exports.fetchVerifyByName = async function(username) {
    return await verificationSchema.findOne({ user: { username: username } });
}

module.exports.getVerifyByCode = async function(token) {
    return await verificationSchema.findOne({ code: token, verified: false });
}

module.exports.getVerifyById = async function(verifiedId) {
    return await verificationSchema.findOne({ verifiedId: verifiedId, verified: true });
}

module.exports.updateVerify = async function(userID) {
    return await verificationSchema.updateOne({ id: userID, verified: false }, { verified: true }, {});
}

module.exports.updateVerifyData = async function(userID, data) {
    return await verificationSchema.updateOne({ id: userID }, { data: data }, {});
}