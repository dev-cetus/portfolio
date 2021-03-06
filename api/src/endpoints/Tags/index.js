const {Tags} = require('../../Models');

module.exports = {
    async routes(fastify) {
        fastify.get('/', async (request, reply) => {
            await Tags.find({})
                .then((tags) => {
                    return reply.send(tags);
                })
                .catch(() => {
                    return reply.code(404).send({
                        error: 'Tags not found'
                    });
                })
        })
    }
}