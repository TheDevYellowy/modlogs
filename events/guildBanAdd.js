const ml = require('../classes/bot');
const { GuildBan, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {GuildBan} ban
     */
    async run(ban) {
        const audit = (await ban.guild.fetchAuditLogs({ type: null })).entries.first();
        const text = `**${audit.executor.username}** banned **${ban.user.username}** for **${ban.reason ? ban.reason : 'No Reason Provided'}**`;

        const data = await this.client.findOrCreateGuild({ id: ban.guild.id });
        if(data.logId == undefined) return;
        const log = await ban.guild.channels.fetch(data.logId);
        if(log.type !== 0) return;

        const embed = new EmbedBuilder()
            .setTitle('Ban Create')
            .setDescription(text)

        log.send({ embeds: [embed] });
    }
}