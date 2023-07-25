const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios')
const cheerio = require('cheerio');
const baseURL=  'https://api.rla2.cityway.fr/disrupt/api/v1/fr';

function parseHTML(html) {
    const $ = cheerio.load(html);
    return $.text();
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('perturbation')
		.setDescription("Donne les perturbations sur les lignes du réseau lignes d'azur en temps réel!"),
	async execute(interaction) {
            axios.get(baseURL+"/lines/upcoming")
            .then(async function (response) {
                const description = parseHTML(response.data.data.majorDisruptions[0].description)
                await interaction.reply(`**Perturbation pour aujourd'hui**: \n${description}`)                
            })
            .catch(async function (e) {
                await interaction.reply("Une erreur est survenue : ```"+e+"```")                
            })
	},
};