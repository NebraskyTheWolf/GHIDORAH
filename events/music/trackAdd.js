module.exports = function (client, queue, track) {
	if (queue) {
        queue.metadata.send({
            "components": [
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 2,
                      "label": `Music added -> ${track.title}`,
                      "custom_id": `row_0_button_0`,
                      "disabled": true,
                      "emoji": {
                        "id": `920840187230158848`,
                        "name": `TFA_Music`,
                        "animated": false
                      },
                      "type": 2
                    }
                  ]
                },
                {
                  "type": 1,
                  "components": [
                    {
                      "style": 2,
                      "label": `Requested by <@${queue.requestedBy.id}>`,
                      "custom_id": `row_0_button_0`,
                      "disabled": true,
                      "emoji": {
                        "id": `920840187230158848`,
                        "name": `TFA_Music`,
                        "animated": false
                      },
                      "type": 2
                    }
                  ]
                }
            ]
        }).catch(e => { });
    }
};