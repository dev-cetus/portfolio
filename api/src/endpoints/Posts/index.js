const { Posts: Index } = require('../../Models');

module.exports = {
    permissions: ["none"],
    async routes(fastify) {
        fastify.get(`/`, async (request, reply) => {
            reply.code(200).send(
                await Index.find({})
            )
        })

        fastify.get(`/:slug`, async (request, reply) => {
            let post = await Index.findOne({slug: request.params.slug});

            if (!post) {
                return reply.status(404).send({
                    error: 'Post not found'
                });
            }

            reply.status(200).send(post);
        })
    }
}