const ml = require('../classes/bot');
const { Role, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {Role} role
     */
    async run(role) {
        const audit = (await role.guild.fetchAuditLogs({ type: 32 })).entries.first();
        const text = `**${audit.executor.username}** deleted role **${role.name}**`;

        const data = await this.client.findOrCreateGuild({ id: role.guild.id });
        if(data.logId == undefined) return;
        const log = await role.guild.channels.fetch(data.logId);
        if(log.type !== 0) return;

        const embed = new EmbedBuilder()
            .setTitle('Role Delete')
            .setDescription(text)

        log.send({ embeds: [embed] });
    }
}