const { 
    SlashCommandBuilder, 
    StringSelectMenuBuilder,  
    StringSelectMenuOptionBuilder, 
    ActionRowBuilder } = require('discord.js');

const axios = require('axios')
const cheerio = require('cheerio');
const utils = require('../utils/utils');
const baseURL=  'https://api.rla2.cityway.fr/disrupt/api/v1/fr';

function parseHTML(html) {
    const $ = cheerio.load(html);
    return $.text();
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription("Donne toutes les infos sur le réseau lignes d'azur en temps réel!")
        .addBooleanOption(option =>
            option.setName('majeur')
                .setDescription('Préferer les infos importantes')
        ),
	async execute(interaction) {
            const majeur = interaction.options.getBoolean('majeur') ?? false;
            console.log(baseURL+"/disruptions/upcoming?OnlyMajors="+majeur)
            axios.get(baseURL+"/disruptions/upcoming?OnlyMajors="+majeur)
            .then(async function (response) {
                const disruptions = response.data.data
                    .filter(item => item.description !== "")
                    .map(item => ({
                        title: item.title,
                        description: item.description
                  }));
                const options = []
                  
                disruptions.forEach(info => {
                    info.description=utils.parseHTML(info.description);
                    let test = `la ligne est déviée après avoir effend son itinéraire à Carlone. Les ar’Antenne ne sont pasffffffffi`
                    options.push(new StringSelectMenuOptionBuilder()
                        .setLabel(info.title)
                        .setValue(test));
                    console.log(test.length);
                });
                // const select = new StringSelectMenuBuilder()
                // .setCustomId('news')
                // .setPlaceholder('Informations')
                // .addOptions(options);
                // const row = new ActionRowBuilder()
                // .addComponents(select);
                // await interaction.reply({
                //     content: 'Choisissez une info parmis la liste',
                //     components: [row],
                // });          
                await interaction.reply("Pong")
            })
            .catch(async function (e) {
                await interaction.reply("Une erreur est survenue : ```"+e+"```")                
            })
	},
};


