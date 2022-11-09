const ml = require('../classes/bot');
const { VoiceState, EmbedBuilder } = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {VoiceState} oldState
     * @param {VoiceState} newState
     */
    async run(oldState, newState) {
        
    }
}