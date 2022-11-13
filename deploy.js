module.exports = () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const { REST, Routes } = require('discord.js');
    const { clientId, guildId, token } = require('./config.js');

    const commands = [];

    const oo = [];
    const owner = ['update'];

    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        const data = command.data.toJSON();
        if(oo.includes(data.name)) owner.push(data);
        else commands.push(data);
    }

    const rest = new REST({ version: '10' }).setToken(token);

    rest.put(Routes.applicationCommands(clientId), { body: commands })
        .then((data) => console.log(`Deployed ${data.length} global commands`))
        .catch(console.error);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: owner })
        .then((data) => console.log(`Deployed ${data.length} owner commands`))
        .catch(console.error);
}