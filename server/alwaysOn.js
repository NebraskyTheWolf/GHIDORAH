const fetch = require("node-fetch");

function alwaysOn() {
	setInterval(async () => {
		await fetch("http://localhost:2598");
	}, 240000);
}

module.exports = alwaysOn;