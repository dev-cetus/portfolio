const config = require('./config.json');
const Logger = require('./Utils/Logger');
const mongoose = require("mongoose");

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

// Register Routes
['Users', 'Posts', 'Login', 'newAccount'].forEach(route => {
    fastify.register(require(`./Routes/${route}`), { prefix: `/${route.toLowerCase()}` });
    Logger.route(`Registered route: ${route}`);
});

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