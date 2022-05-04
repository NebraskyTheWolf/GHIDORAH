module.exports = function (client, message) {
	const nowdate = new Date().toLocaleString("en-UK", {
		timeZone: "Europe/London",
	});
	let { author, content } = message;
	if (!author || !content) return;
	client.snipes.set(message.channel.id, {
		content: content,
		author: `${author.username}#${author.discriminator}`,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null,
		date: nowdate,
	});
};