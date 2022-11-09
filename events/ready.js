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
        this.client.user.setPresence({ activities: [{ name: 'Bowling', type: 5 }], status: 'dnd' });
        console.log(`${this.client.user.username} is ready to log`);
    }
}