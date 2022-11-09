const ml = require('../classes/bot');
const { DMChannel, NonThreadGuildBasedChannel, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {DMChannel | NonThreadGuildBasedChannel} oldChannel 
     * @param {DMChannel | NonThreadGuildBasedChannel} newChannel 
     */
    async run(oldChannel, newChannel) {

    }
}