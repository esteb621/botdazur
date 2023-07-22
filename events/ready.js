const config = require('../config.json')

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
      client.guilds.cache.get(config.server).commands.fetch();
      client.user.setActivity("au bowling avec les gens");
      console.log(`Logged in as ${client.user.tag}`);
    },
  };
  