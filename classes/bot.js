const { Client, Collection } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const mongoose = require('mongoose');

module.exports = class modlogs extends Client {
    constructor() {
        super({ intents: '709' });
        
        this.config = require('../config');
        this.commands = new Collection();

        this.guildData = require('../schemas/Guild');
    }

    // Main functions
    async loadCommands() {
        const pth = path.join(process.cwd(), 'commands');
        const files = fs.readdirSync(pth).filter(f => f.endsWith('.js'));

        for (const file of files) {
            const filePth = path.join(pth, file);
            const cmd = require(filePth);
            this.commands.set(cmd.data.name, cmd);
        }

        console.log(`Loaded ${this.commands.size} commands`);
    }

    async start() {
        await mongoose.connect(this.config.mongoURL);
        await this.loadCommands();
        await this.login(this.config.token);
    }

    // Util functions
    async findOrCreateGuild({ id: guildId }) {
        let data = await this.guildData.findOne({ id: guildId });
        if(data) return data;

        data = new this.guildData({ id: guildId });
        await data.save();
        return data;
    }
}


