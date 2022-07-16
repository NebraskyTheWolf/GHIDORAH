module.exports = async (client, message) => {

    const emoji = message.content.split(':')[1];
    const vip = client.Database.isVip(message.author.id);

    if (emoji === 'cookie') {
        if (vip) {
            message.channel.send({
                content: `${message.author.tag} Hey pssst fwend I give you 5 more cookies uwu`,
                flags: 64,
                type: 19
            });
        } else {
            message.channel.send({
                content: `${message.author.tag} I stole your cookie :yum: that's all mine ;3`,
                flags: 64,
                type: 19
            });
        }
    } else if (message.content.includes('cute')   || 
               message.content.includes('cuter')  ||
               message.content.includes('cut3r')  ||
               message.content.includes('cwute')  ||
               message.content.includes('cuwute') ||
               message.content.includes('cyoot')) {
        if (vip) {
            message.channel.send({
                content: 'You\'re not a cutie!',
                type: 19
            });
        } else {
            message.channel.send({
                content: 'You\'re cuter!',
                type: 19
            });
        }
    } else if (emoji === 'fish') {
        message.channel.send({
            content: `${message.author.tag} I stole your fimsh :yum: that's all mine ;3`,
            flags: 64,
            type: 19
        });
    }
};