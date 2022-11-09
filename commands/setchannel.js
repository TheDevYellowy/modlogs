const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const guildData = require('../schemas/Guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('sets the mod logs channel')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The text channel')
                .setRequired(false) 
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDMPermission(false),
    
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        let channel = interaction.options.get('channel');
        if(channel == undefined) channel = interaction.channel;

        const data = await guildData.findOne({ id: interaction.guildId });
        data.logId = channel.id;
        await data.save();

        interaction.reply({ content: `Modlogs set to <#${channel.id}>`});
    },
};