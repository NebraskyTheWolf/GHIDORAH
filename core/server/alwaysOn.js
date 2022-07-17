const fetch = require("node-fetch");

function alwaysOn() {
	setInterval(async () => {
		await fetch("https://api.skf-studios.com");
	}, 240000);
}

module.exports = alwaysOn;