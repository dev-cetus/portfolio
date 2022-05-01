const { Posts } = require('../Models/index');

async function routes(fastify) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            reply.send(
                await Posts.find({})
            )
        }
    });

    fastify.route({
        method: 'GET',
        url: '/:slug',
        handler: async (request, reply) => {
            let post = await Posts.findOne({ slug: request.params.slug });

            if (!post) {
                return reply.status(404).send({
                    message: 'Post not found'
                });
            }

            reply.status(200).send(post);
        }
    });

}

module.exports = routes;