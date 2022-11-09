const ml = require('../classes/bot');
const { Interaction } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * @param {Interaction} interaction
     */
    async run(interaction) {
        if(!interaction.isChatInputCommand()) return;

        const command = this.client.commands.get(interaction.commandName);
        if(!command) return;

        var data = this.client.findOrCreateGuild({ id: interaction.guildId });

        try {
            await command.execute(interaction, data);
        } catch (e) {
            console.error(e);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}