const ml = require('../classes/bot');
const { Message, PartialMessage, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {Message<boolean> | PartialMessage} message
     */
    async run(message) {
        const audit = (await message.guild.fetchAuditLogs({ type: 72 })).entries.first();
        let text = ``;

        if(audit.executor.id == message.author.id) text = `${message.author.username} deleted their own message, the content is below\n\n${message.content}`;
        else text = `**${audit.executor.username}** deleted ${message.author.username}'s message, the content is below\n\n${message.content}`;

        const data = await this.client.findOrCreateGuild({ id: message.guildId });
        if(data.logId == undefined) return;
        const log = await message.guild.channels.fetch(data.logId);
        if(log.type !== 0) return;

        const embed = new EmbedBuilder()
            .setTitle('Message Delete')
            .setDescription(text)

        log.send({ embeds: [embed] });
    }
}