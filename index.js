const { Client, GatewayIntentBits,Events, Collection } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const path = require('path')
const Parser = require('rss-parser')


const client = new Client({ 
    intents : [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ]
})
const newsFilePath = './news.json';

function loadSentNews() {
	try {
	  const data = fs.readFileSync(newsFilePath, 'utf8');
	  return JSON.parse(data);
	} catch (error) {
	  return [];
	}
  }

  let sentNews = loadSentNews();

function saveSentNews(news) {
	fs.writeFileSync(newsFilePath, JSON.stringify(news, null, 2), 'utf8');
}

function sendNewsToDiscord(channel, news) {
	for (const item of news) {
		if (!sentNews.includes(item.guid)) {
			channel.send(`Nouvelle info sur Lignes d'Azur :\n${item.title}\n${item.link}\n`);
			sentNews.push(item.guid);
		}
	}
	saveSentNews(sentNews);
  }

async function checkNews() {
	const parser = new Parser();
  try{
    const feed = await parser.parseURL("https://www.lignesdazur.com/flux/contenu/all");
	let items = [];
    const news = feed.items;

    if(news.length > 0) {
      const channel = client.channels.cache.get('1133499014499811420')
	  if (channel) {
        sendNewsToDiscord(channel, news);
      }
    }
  }
  catch(e){
    console.error("Erreur: "+e)
  }
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.on(Events.InteractionCreate,  async (interaction) => {
	if(!interaction.isStringSelectMenu()) return;

	if(interaction.customId === "line") {
		await interaction.reply({content: `${interaction.values[0]}`})
	}

	if(interaction.customId === "news") {
		await interaction.reply({content: `${interaction.values[0]}`})
	}
})



client.on('ready', () => {
	setInterval(checkNews, 3600);
});

client.login(config.token);
