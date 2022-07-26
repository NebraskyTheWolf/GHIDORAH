const { Modal, TextInputComponent, showModal } = require('discord-modals');

module.exports = {
    data: {
        name: "row_neyaz_reservation"
    },
    async execute(interaction, interactionUser) {
        const modal = new Modal()
        .setCustomId(`row_modal_neyaz_reservation`)
        .setTitle(`Réservation de formule.`)
        .addComponents(
            new TextInputComponent()
                .setCustomId(`row_id_userVerify_${interaction.user.id}_textActionData_1`)
                .setStyle("LONG")
                .setLabel("Qu'elle et votre TAG Discord?")
                .setMinLength(0)
                .setMaxLength(4000)
                .setPlaceholder("Veuillez s'il vous plait donnée votre tag incluent le #XXXX")
                .setRequired(true),
            new TextInputComponent()
                .setCustomId(`row_id_userVerify_${interaction.user.id}_textActionData_2`)
                .setStyle("SHORT")
                .setLabel("Qu'elle et ton pseudo sur Apex?")
                .setMinLength(0)
                .setMaxLength(4000)
                .setPlaceholder("Votre pseudo ici.")
                .setRequired(true),
            new TextInputComponent()
                .setCustomId(`row_id_userVerify_${interaction.user.id}_textActionData_3`)
                .setStyle("LONG")
                .setLabel("Qu'elle rank et tu?")
                .setMinLength(0)
                .setMaxLength(4000)
                .setPlaceholder("Merci de donnée ton rank ( ne mentez pas ça sert a rien. ).")
                .setRequired(true),
            new TextInputComponent()
                .setCustomId(`row_id_userVerify_${interaction.user.id}_textActionData_4`)
                .setStyle("SHORT")
                .setLabel("Par qu'elle formule êtes vous intérésser?")
                .setMinLength(0)
                .setMaxLength(4000)
                .setPlaceholder("Merci d'indiquer la formule ici.")
                .setRequired(true),
            new TextInputComponent()
                .setCustomId(`row_id_userVerify_${interaction.user.id}_textActionData_6`)
                .setStyle("SHORT")
                .setLabel("Qu'elle et votre platforme de jeu?")
                .setMinLength(0)
                .setMaxLength(4000)
                .setPlaceholder("Merci de respecter le format suivant: pc, psn, xbl")
                .setRequired(true)
        )
        showModal(modal, {
            client: client,
            interaction: interaction
        });
    }
}