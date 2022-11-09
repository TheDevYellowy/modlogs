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
     * @param {Role} oldRole
     * @param {Role} newRole
     */
    async run(oldRole, newRole) {
        var embeds = [];

        const data = await this.client.findOrCreateGuild({ id: newRole.guildId });
        if(data.logId == undefined) return;
        var log = await newRole.guild.channels.fetch(data.logId);
        if(log.type !== 0) return;

        const audit = (await newRole.guild.fetchAuditLogs({ type: 31 })).entries.first();

        if(oldRole.permissions !== newRole.permissions) {
            var oldPerms = oldRole.permissions.serialize();
            var newPerms = newRole.permissions.serialize();

            const lost = [];
            const gained = [];

            for(const [key, elem] of Object.entries(oldPerms)) {
                if(newPerms[key] !== elem) {
                    if(newPerms[key] > elem) gained.push(key);
                    else lost.push(key);
                }
            }

            console.log({ gained, lost })

            const perms = new EmbedBuilder()
                .setTitle('Role Permission Update')
                .setDescription(`${audit.executor.username} edited ${newRole.toString()}\nIt lost the following permissions: ${lost.length > 0 ? lost.join(', ') : 'None'}\n\nAnd gained the following permissions: ${gained.length > 0 ? gained.join(', ') : 'None'}`);

            log.send({ embeds: [perms] })
        } else if(oldRole.name !== newRole.name) {
            const name = new EmbedBuilder()
                .setTitle('Role Name Update')
                .setDescription(`${audit.executor.username} edited a role\n\n__Old Name__\n${oldRole.name}\n__New Name__\n${newRole.name}`);

            log.send({ embeds: [name] })
        }
    }
}