const ml = require('../classes/bot');
const {} = require('discord.js');

module.exports = class {
    /**
     * @param {ml} client
     */
    constructor(client) {
        this.client = client;
    }

    async run() {
        console.log(`${this.client.user.username} is ready to log`);
    }
}