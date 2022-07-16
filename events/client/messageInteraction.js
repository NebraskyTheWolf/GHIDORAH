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
    } else if (message.content.contains('cute')   || 
               message.content.contains('cuter')  ||
               message.content.contains('cut3r')  ||
               message.content.contains('cwute')  ||
               message.content.contains('cuwute') ||
               message.content.contains('cyoot')) {
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