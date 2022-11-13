const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { execSync } = require('child_process')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('updates the bot'),
    
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        await execSync('git pull');
        interaction.reply('git pull done, restarting');

        process.exit(1);
    },
};