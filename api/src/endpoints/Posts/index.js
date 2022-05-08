const { Posts: Index } = require('../../Models');

async function routes(fastify) {
    fastify.get(`/`, async (request, reply) => {
        reply.send(
            await Index.find({})
        )
    })

    fastify.get(`/:slug`, async (request, reply) => {
        let post = await Index.findOne({ slug: request.params.slug });

        if (!post) {
            return reply.status(404).send({
                message: 'Post not found'
            });
        }

        reply.status(200).send(post);
    })
}

module.exports = routes;