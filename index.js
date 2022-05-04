const db = require("quick.db");
const Enmap = require("enmap");
const DisTube = require("distube");
const { Collection, Client, Intents } = require("discord.js");
const discordModals = require('discord-modals')

const { GiveawaysManager } = require("discord-giveaways");

const emojis = require("./config/emoji.json");
const config = require("./config/config.json");
const keepAlive = require("./server/http");

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
});

discordModals(client);

client.config = config;
global.client = client;
global.nowyear = new Date().getFullYear();
global.emojis = emojis;

const nz_date_string = new Date().toLocaleString("en-UK", {
	timeZone: "Europe/London",
});

client.commands = new Collection();
client.slcommands = new Collection();
client.aliases = new Collection();
client.emotes = emojis;
client.colors = client.config.colors;
client.snipes = new Collection();
client.mapss = new Collection();
client.mapss.set("uptimedate", nz_date_string);
client.buttons = new Collection();
client.modals = new Collection();

["command", "event", "music"].forEach(x => require(`./handlers/${x}.js`)(client));
["alwaysOn", "http"].forEach(x => require(`./server/${x}.js`));

keepAlive();

client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: "deep"
});

client.moderationdb = new Enmap("moderation");
client.distube = new DisTube(client, {
    leaveOnFinish: true,
    leaveOnEmpty: true,
    leaveOnStop: true,
    youtubeDL: true,
    updateYoutubeDL: false,
    youtubeCookie: "GPS=1; YSC=w5dGoHzqQRI; VISITOR_INFO1_LIVE=B4ElBqxSDv4; PREF=tz=Asia.Hong_Kong"
});

if (!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    async getAllGiveaways() {
        return db.get("giveaways");
    }

    async saveGiveway(messageID, giveawayData) {
        db.push("giveaways", giveawayData);
        return true;
    }

    async editGiveaway(messageID, giveawayData) {
        const giveaways = db.get("giveaways");
        const newGiveawaysArray = giveaways.filter(
                giveaway => giveaway.messageID !== messageID
        );
        newGiveawaysArray.push(giveawayData);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

    async deleteGiveaway(messageID) {
        const newGiveawaysArray = db
			.get("giveaways")
			.filter(giveaway => giveaway.messageID !== messageID);
		db.set("giveaways", newGiveawaysArray);
		return true;
    }
}

client.giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
    storage: true,
    updateCountdownEvery: 10000,
    endedGiveawaysLifetime: 30000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#ff6969",
        embedColorEnd: "#505050",
        reaction: "🎉"
    }
});

client.status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${
                queue.filter || "Off"
            }\`${
                queue.repeatMode
                    ? queue.repeatMode == 2
                        ? "All Queue"
                        : "This Song"
                    : "Off"
            }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.ws.on("INTERACTION_CREATE", async interaction => {
    if (!client.commands.has(interaction.data.name)) return;
    try {
        client.commands.get(interaction.data.name).execute(interaction);
    } catch (error) {
        console.log(`Error from command ${interaction.data.name} : ${error.message}`);
        console.log(`${error.stack}\n`);
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