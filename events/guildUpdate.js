const ml = require('../classes/bot');
const { Guild, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {Guild} oldGuild
     * @param {Guild} newGuild
     */
    async run(oldGuild, newGuild) {
        const data = await this.client.findOrCreateGuild({ id: newGuild.id });
        if(data.logId == undefined) return;
        var log = await newGuild.channels.fetch(data.logId);
        if(log.type !== 0) return;

        const audit = (await newGuild.fetchAuditLogs({ type: 1 })).entries.first();

        if(oldGuild.afkChannelId !== newGuild.afkChannelId) {
            const e = new EmbedBuilder()
                .setTitle('Guild Afk Channel Update')
                .setDescription(`${audit.executor.username} changed the afk channel\n\n__Old__\n${oldGuild.afkChannel == null ? 'None' : oldGuild.afkChannel.name}\n\n__New__\n${newGuild.afkChannel == null ? 'None' : newGuild.afkChannel.name}`);
            
            log.send({ embeds: [e] });
        } else if(oldGuild.afkTimeout !== newGuild.afkTimeout) {
            const e = new EmbedBuilder()
                .setTitle('Guild Afk Timeout Update')
                .setDescription(`${audit.executor.username} changed the afk timeout\n\n__Old__\n${oldGuild.afkTimeout/60} Minutes\n\n__New__\n${newGuild.afkTimeout/60} Minutes`);
            
            log.send({ embeds: [e] });
        } else if(oldGuild.banner !== newGuild.banner) {
            const oldB = oldGuild.bannerURL();
            const newB = newGuild.bannerURL();

            const e = new EmbedBuilder()
                .setTitle('Guild Banner Update')
                .setDescription(`${audit.executor.username} changed the banner\n\n__Old__\n${oldB == null ? 'None' : oldB}\n\n__New__\n${newB == null ? 'None' : newB}`);
            
            log.send({ embeds: [e] });

        } else if(oldGuild.defaultMessageNotifications.toString() !== newGuild.defaultMessageNotifications.toString()) {
            const e = new EmbedBuilder()
                .setTitle('Guild Notification Update')
                .setDescription(`${audit.executor.username} changed the default message notifications to ${newGuild.defaultMessageNotifications.toString()}`);
            
            log.send({ embeds: [e] });
        } else if(oldGuild.description !== newGuild.description) {
            const oldD = oldGuild.description;
            const newD = newGuild.description;

            const e = new EmbedBuilder()
                .setTitle('Guild Description Update')
                .setDescription(`${audit.executor.username} changed the description\n\n__Old__\n${oldD == null ? 'None' : oldD}\n\n__New__\n${newD == null ? 'None' : newD}`);
            
            log.send({ embeds: [e] });
        } else if(oldGuild.discoverySplash !== newGuild.discoverySplash) {
            const oldD = oldGuild.discoverySplashURL();
            const newD = newGuild.discoverySplashURL();

            const e = new EmbedBuilder()
                .setTitle('Guild Discovery Splash Update')
                .setDescription(`${audit.executor.username} changed the banner\n\n__Old__\n${oldD == null ? 'None' : oldD}\n\n__New__\n${newD == null ? 'None' : newD}`);
            
            log.send({ embeds: [e] });
        } else if(oldGuild.explicitContentFilter.toString() !== newGuild.explicitContentFilter.toString()) {
            const e = new EmbedBuilder()
                .setTitle('Guild Explicit Filter Update')
                .setDescription(`${audit.executor.username} changed the explicit content filter to ${newGuild.explicitContentFilter.toString()}`);
        
            log.send({ embeds: [e] });
        } else if(oldGuild.icon !== newGuild.icon) {
            const oldI = oldGuild.iconURL();
            const newI = newGuild.iconURL();

            const e = new EmbedBuilder()
                .setTitle('Guild Icon Update')
                .setDescription(`${audit.executor.username} changed the icon\n\n__Old__\n${oldI == null ? 'None' : oldI}\n\n__New__\n${newI == null ? 'None' : newI}`);
            
            log.send({ embeds: [e] });
        } else if(oldGuild.name !== newGuild.name) {
            const e = new EmbedBuilder()
                .setTitle('Guild Banner Update')
                .setDescription(`${audit.executor.username} changed the banner\n\n__Old__\n${oldGuild.name}\n\n__New__\n${newGuild.name}`);
            
            log.send({ embeds: [e] });
        }
    }
}