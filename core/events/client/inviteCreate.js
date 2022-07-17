module.exports = function (client, invite) {
	client.invites.get(invite.guild.id).set(invite.code, invite.uses);
};