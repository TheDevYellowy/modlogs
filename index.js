console.clear();

const Client = require('./classes/bot');
const client = new Client();

const readdir = require('util').promisify(require('fs').readdir);

(async () => {
    require('./deploy')();

    const evtFiles = await readdir('./events/');
    console.log(`Loading ${evtFiles.length} events`);
    evtFiles.forEach(file => {
        const evtName = file.split('.')[0];
        const event = new (require(`./events/${evtName}`))(client);
        client.on(evtName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
})();

client.start();