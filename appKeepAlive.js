const { Webhook } = require('discord-webhook-node');
const fetch = require('node-fetch');

const hook = new Webhook("https://discord.com/api/webhooks/974203356123902022/HADklX6l0pZ08DAiDvUc-Qgj2Pv5t4tNoew4jGyOdVeCuIAuvLTRkpQkdT0retF3Ufkx");

hook.setUsername('Monitor');

setInterval(async () => {
    await fetch("http://localhost:2598")
        .then(() => {
            console.log('GHIDORAH IS ALIVE');
        })
        .catch((err) => {
            hook.send('<@382918201241108481> keep alive timed out.')
            hook.error(`Monitoring failed for GHIDORAH`, `Exception handled`, `${err}`);
        });
}, 15000);