const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('updates the bot'),
    
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const out = await exec('git pull');
        interaction.reply({ content: out.stdout });

        process.exit(1);
    },
};