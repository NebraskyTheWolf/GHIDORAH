const { Collection, Client, Intents } = require("discord.js");
const discordModals = require('discord-modals')

const mongoose = require('mongoose');

const events = require('events');

const emojis = require("./config/emoji.json");
const config = require("./config/config.json");
const keepAlive = require("./server/http");

const redis = require('redis');
const redisClient = redis.createClient(config.RedisClient);

const ModuleManager = require('./modules/ModulesManager');
const ConsoleColors = require('./utils/ConsoleColor');
const Logger = require('./utils/Logger');

const StringUtils = require('./utils/StringUtils');

const LXDUtils = require('./utils/LXDUtils');
const ROOMManager = require('./utils/MovieRoom');

const func = require('./utils/function');

const LevelCalculator = require('./utils/LevelCalculator');
const PayloadHandler = require('./utils/PayloadHandler');

const IsLoaded = false;
const IsDebug = process.env.DEBUG;

const { fingerprint } = require('key-fingerprint');
const prints = fingerprint(process.env.PUBLIC_KEY, { encoding: 'hex', algorithm: 'sha512' });

const client = new Client({
	partials: ["MESSAGE", "USER", "REACTION"],
	disableMentions: "everyone",
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
      ],
      ws: { properties: { $browser: "Discord iOS" } }
});

discordModals(client);

client.config = config;
global.client = client;
global.nowyear = new Date().getFullYear();
global.emojis = emojis;

const nz_date_string = new Date().toLocaleString("en-UK", {
	timeZone: "Europe/London",
});

client.Database = require('./Database/MongoDB');

client.consoleColors = ConsoleColors;
client.logger = Logger;

client.commands = new Collection();
client.slcommands = new Collection();

client.twitchCommands = new Collection();

client.aliases = new Collection();
client.emotes = emojis;
client.colors = client.config.colors;
client.snipes = new Collection();
client.mapss = new Collection();
client.mapss.set("uptimedate", nz_date_string);
client.buttons = new Collection();
client.modals = new Collection();

client.redis = redisClient;
client.packets = new Collection();

client.tasks = new Collection();

client.modules = new Collection();
client.moduleManager = ModuleManager;
client.Modlog = require('./utils/ModLog');

const Levels = require("discord-xp");
Levels.setURL(config.MongoDBInfo.host)

client.levels = Levels;

client.invites = new Collection();
client.events = new events.EventEmitter();
client.StringUtils = StringUtils;

client.networks = new Collection();
client.lxdNetwotk = LXDUtils;

client.movieRooms = new Collection();
client.movieReservedVLAN = new Collection();
client.ROOMManager = ROOMManager;

client.mainGuild = client.guilds.cache.get('917714328327692338');

client.func = func;

client.IsLoaded = IsLoaded;
client.IsDebug = IsDebug;

client.errorLists = new Collection();
client.dailyMessages = new Collection();

client.globalLvL = new Collection();
client.globalXp = new Collection();

client.cancellableTasks = new Collection();

client.LevelCalculator = LevelCalculator;

client.PayloadHandler = PayloadHandler;
client.payload = new Collection();

client.fingerprint = prints;

function createOrSet(array, key, value) {
    if (array[key] !== undefined)
        array[key].push(value);
    else
        array[key] = [value];
}

mongoose.connect(config.MongoDBInfo.host, config.MongoDBInfo.options).then(() => {
    client.logger.log('INFO', 'Connected to MongoDB');
}).catch((err) => {
    client.logger.log('WARN', 'Unable to connect to MongoDB Database.');
});

redisClient.connect().then(() => {
    client.logger.log('INFO', 'Connected to Redis.');
}).catch((err) => {
    client.logger.log('WARN', 'Unable to connect to Redis server.')
});

client.createOrSet = createOrSet;
[
    "command",
    "event",
    "anticrash",
    "payload",
    "security"
].forEach(x => require(`./handlers/${x}.js`)(client));
[
    "alwaysOn",
     "http"
].forEach(x => require(`./server/${x}.js`)(client));

client.ws.on("INTERACTION_CREATE", async interaction => {
    let guild = await client.Database.fetchGuild(interaction.guild_id);

    if (guild.blacklisted) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Sorry but this server are blacklisted.",
                    flags: 64
                },
            },
        });
        return;
    }

    if (!client.commands.has(interaction.data.name)) return;
    if (!client.IsLoaded) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Sorry but my code is not loaded. Please wait a few seconds.",
                    flags: 64
                },
            },
        });
        return;
    }

    try {
        await client.commands.get(interaction.data.name).execute(interaction);
    } catch (error) {
        client.logger.log('ERROR', `Error from command ${interaction.data.name} : ${error.message}`);
        client.logger.log('ERROR', `${error.stack}\n`);
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Sorry, error occured when running this command!",
                    flags: 64
                },
            },
        });
    }
});

client.login(process.env.TOKEN);