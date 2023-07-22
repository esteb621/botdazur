const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const horaires = require('../utils/horaire');
const PDFImage = require('pdf-image').PDFImage;
const fs = require('fs');
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

            let horraireImage = new PDFImage('commands/image/ligne_Q.pdf');
            console.log(fs.existsSync("commands/image/ligne_Q.pdf"))
            console.log (horraireImage)
            horraireImage.convertPage(0).then(function (imagePath = 'commands/image/' ){
                fs.existsSync("commands/image/slide-0.pdf")});
            console.log(fs.existsSync("commands/image/slide-0.png"))
            await interaction.reply('pong');
        }
        else if(lines.length > 1){
            const options = []
            lines.forEach(line => {
                options.push(new StringSelectMenuOptionBuilder()
                    .setLabel(line.name)
                    .setValue(line.link)
                )
            });
            const select = new StringSelectMenuBuilder()
			.setCustomId('line')
			.setPlaceholder('Votre ligne')
			.addOptions(options);
            const row = new ActionRowBuilder()
			.addComponents(select);
            await interaction.reply({
                content: 'Chosissez la ligne correspondante',
                components: [row],
            });
             
            
        }
        else {
		    await interaction.reply('Aucune ligne '+query+' trouvé');
        }
	},
};