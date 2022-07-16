module.exports = async (client, message) => {

    const emoji = message.content.split(':')[1];
    const vip = client.Database.isVip(message.author.id);

    if (emoji === 'cookie') {
        if (vip) {
            message.channel.reply({
                content: `${message.author.tag} Hey pssst fwend I give you 5 more cookies uwu`,
                flags: 64
            });
        } else {
            message.channel.reply({
                content: `${message.author.tag} I stole your cookie :yum: that's all mine ;3`,
                flags: 64
            });
        }
    } else if (message.content.includes('cute')   || 
               message.content.includes('cuter')  ||
               message.content.includes('cut3r')  ||
               message.content.includes('cwute')  ||
               message.content.includes('cuwute') ||
               message.content.includes('cyoot')) {
        if (vip) {
            message.channel.reply({
                content: 'You\'re not a cutie!'
            });
        } else {
            message.channel.reply({
                content: 'You\'re cuter!'
            });
        }
    } else if (emoji === 'fish') {
        message.channel.reply({
            content: `${message.author.tag} I stole your fimsh :yum: that's all mine ;3`,
            flags: 64
        });
    }
};