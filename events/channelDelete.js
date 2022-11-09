const ml = require('../classes/bot');
const { DMChannel, NonThreadGuildBasedChannel, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {DMChannel | NonThreadGuildBasedChannel} channel
     */
    async run(channel) {
        if(channel.type == ChannelType.DM) return;
        const audit = (await channel.guild.fetchAuditLogs({ type: 12 })).entries.first();
        const text = `**${audit.executor.username}** deleted channel **${channel.name}**`;

        const data = await this.client.findOrCreateGuild({ id: channel.guildId });
        if(data.logId == undefined) return;
        const log = await channel.guild.channels.fetch(data.logId);
        if(log.type !== 0) return;

        const embed = new EmbedBuilder()
            .setTitle('Channel Create')
            .setDescription(text)

        log.send({ embeds: [embed] });
    }
}