const config = require('./config.json');
const Logger = require('./Utils/Logger');
const mongoose = require("mongoose");
const {readdirSync} = require('fs');

// Disable logger
const fastify = require('fastify')({
    logger: false
});

// CORS
fastify.register(require('@fastify/cors'), {
      origin: config.cors.client_uri,
      methods: ['GET', 'POST', 'DELETE'],
      credentials: true
});

// JWT (Authentication)
fastify.register(require('@fastify/jwt'), {
    secret: config.jwt.secret,
    sign: {
    expiresIn: config.jwt.expiresIn
  }
});

// Error Handler
process.on('exit', code => { Logger.info(`Exiting with code ${code}`) });
process.on('uncaughtException', async (err, origin) => {
    Logger.error(`UNCAUGHT_EXCEPTION: ${err}`)
    await console.log(origin)
});
process.on('unhandledRejection', async (reason, promise) => {
    Logger.warn(`UNHANDLED_REJECTION: ${reason}`)
    await console.log(promise)
});
process.on('warning', (...args) => { Logger.warn(...args) });

// Register endpoints
readdirSync(`${__dirname}/endpoints`).forEach(folder => {
    if (folder.includes('.js')) return;
    readdirSync(`${__dirname}/endpoints/${folder}`).forEach(file => {
        let prefix = file === "index.js" ? '/' + folder.toLowerCase() : `/${folder.toLowerCase()}/${file.split('.')[0].toLowerCase()}`;
        fastify.register(require(`${__dirname}/endpoints/${folder}/${file}`), {
            prefix: prefix
        });
        Logger.route(`Route loaded ${prefix}`);
    });
});

// Add hooks
fastify.addHook('onRequest', async (request, reply) => {

})

// Connect to MongoDB
mongoose.connect(config.mongodb.uri, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => {
    Logger.info(`Connected to MongoDB`)
}).catch(e => {
    Logger.error(`Failed to connect to MongoDB: ${e}`)
    process.exit(1)
});

// Start the server!
fastify.listen(config.server.port, config.server.address, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    Logger.info(`Server listening on ${address}`);
})