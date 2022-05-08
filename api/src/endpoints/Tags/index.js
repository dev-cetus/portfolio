const {Tags} = require('../../Models');

async function routes(fastify) {

    fastify.get('/', async (request, reply) => {
        await Tags.find({})
            .then((tags) => {
                return reply.send(tags);
            })
            .catch(() => {
                return reply.send({
                    error: 'Tags not found'
                });
            })
    })
}

module.exports = routes;