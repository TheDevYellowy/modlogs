const ml = require('../classes/bot');
const { Collection, Message, PartialMessage, GuildTextBasedChannel, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {Collection<string, Message<boolean> | PartialMessage>} messages
     * @param {GuildTextBasedChannel} channel
     */
    async run(messages, channel) {
        const audit = (await channel.guild.fetchAuditLogs({ type: 73 })).entries.first();
        let text = `**${audit.executor.username}** deleted ${messages.size} messages in <#${channel.id}>\n`;

        messages.forEach(msg => {
            text += `\n${msg.author.username}: ${msg.content}`;
        });

        const data = await this.client.findOrCreateGuild({ id: channel.guildId });
        if(data.logId == undefined) return;
        const log = await channel.guild.channels.fetch(data.logId);
        if(log.type !== 0) return;

        const embed = new EmbedBuilder()
            .setTitle('Bulk Message Delete')
            .setDescription(text)

        log.send({ embeds: [embed] });
    }
}