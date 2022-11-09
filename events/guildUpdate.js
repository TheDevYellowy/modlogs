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

    }
}