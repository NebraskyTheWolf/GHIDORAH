const Discord = require("discord.js");
const os = require("os");

module.exports = {
    name: "uptime",
    description: "Checking uptime.",
    commandOptions: null,
    execute(interaction) {
        const nowtime = new Date().toLocaleString("en", {
            timeZone: "Europe/London",
        });
        const milliseconds = parseInt((client.uptime % 1000) / 100);
        let seconds = parseInt((client.uptime / 1000) % 60);
        let minutes = parseInt((client.uptime / (1000 * 60)) % 60);
        let hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        let days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
        days = days < 10 ? `${days}` : days;
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
    
        let ut_sec = os.uptime();
        let ut_min = ut_sec / 60;
        let ut_hour = ut_min / 60;
        let ut_day = ut_hour / 24;
    
        ut_sec = Math.floor(ut_sec);
        ut_min = Math.floor(ut_min);
        ut_hour = Math.floor(ut_hour);
        ut_day = Math.floor(ut_day);
    
        ut_day %= 24;
        ut_hour %= 60;
        ut_min %= 60;
        ut_sec %= 60;
    
        ut_day = ut_day < 10 ? `${ut_day}` : ut_day;
        ut_hour = ut_hour < 10 ? `0${ut_hour}` : ut_hour;
        ut_min = ut_min < 10 ? `0${ut_min}` : ut_min;
        ut_sec = ut_sec < 10 ? `0${ut_sec}` : ut_sec;

        const uptime = new Discord.MessageEmbed().setColor("#ffbbbb")
            .addField(
                "Bot Uptime",
                `${days} Day, ${hours} Hrs, ${minutes} Min, ${seconds} Sec`
            )
            .addField(
                "Server/OS Uptime",
                `${ut_day} Day, ${ut_hour} Hrs, ${ut_min} Min, ${ut_sec} Sec`
            );
        
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [uptime],
                },
            },
        });
    }
}