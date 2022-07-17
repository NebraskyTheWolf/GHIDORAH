module.exports = function (client, invite) {
	client.invites.get(invite.guild.id).delete(invite.code);
};