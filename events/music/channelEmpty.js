module.exports = function (client, queue) {
	if (queue) {
        queue.metadata.send({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 4,
                      "label": `I left the audio channel because there is no one on my audio channel.`,
                      "custom_id": `row_0_button_0`,
                      "disabled": true,
                      "type": 2
                    }
                  ]
                }
            ]
        }).catch(e => { });
    }
};