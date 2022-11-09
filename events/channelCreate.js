const ml = require('../classes/bot');
const { NonThreadGuildBasedChannel, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {NonThreadGuildBasedChannel} channel
     */
    async run(channel) {
        const audit = (await channel.guild.fetchAuditLogs({ type: 10 })).entries.first();
        const text = `**${audit.executor.username}** created channel **${channel.name}**`;

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