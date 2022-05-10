module.exports = async function (client, event) {
    if (event.customId === undefined) return; // AVOID BOT CRASHING

    const interactionUser = await event.guild.members.fetch(event.user.id)

    if (event.customId.startsWith('row_modal_id_')) {
        let type = event.customId.split('row_modal_id_')[1];
        let finalType = type.split('_')[0];

        const modal = client.modals.get("id_modal");

        switch (finalType) {
            case "userVerify": {
                let userId = type.split('_')[1];
                let modalType = type.split('_')[2];

                modal.execute(event, interactionUser, {
                    type: "USER_ACTION",
                    userId: userId,
                    modalType: modalType
                });
            }
            break;
            default:
                console.log(`Unresolved action ID: ${type} for interaction ID: ${event.customId} executed by ${event.user.id}`)
            break;
        }
    } else {
        const modal = client.modals.get(event.customId);
    
        if(!modal) {
            console.error(`No handler for button ${event.customId} : ${event.customId}.js not found.`);
            return;
        }
    
        try {
            await modal.execute(event, interactionUser);
        } catch (error) {
            console.error(error);
            await event.reply({ content: 'There was an error while executing the modal script !', ephemeral: true});
        }
    }
};