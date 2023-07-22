const { SlashCommandBuilder } = require('discord.js');
const horaires = require('../utils/horaire')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('horaire')
		.setDescription("Renvoie la fiche horaire d'une ligne demandée.")
        .addStringOption(option =>
            option.setName('ligne')
                .setDescription('Le numéro de la ligne')
                .setRequired(true)),
	async execute(interaction) {
        let lines = {};
        const query = interaction.options.getString('ligne');
        lines = await horaires.getLines(query);
        
        if (lines.length == 1){
            await interaction.reply(String(lines[0].link));
        }
        else if(lines.length > 1){
            await interaction.reply('multiple');
        }
        else {
		    await interaction.reply('Aucune ligne '+query+' trouvé');
        }
	},
};