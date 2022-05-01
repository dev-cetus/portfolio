const { Users } = require('../Models/index');

async function routes(fastify) {
    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: async (request, reply) => {
            let user = await Users.findOne({
                where: {
                    id: request.params.id
                }
            });

            if(!user) {
                return reply.code(404).send({
                    message: 'User not found'
                });
            }

            return reply.send({
                "id": user.id,
                "name": user.username
            });
        }
    });

}

module.exports = routes;