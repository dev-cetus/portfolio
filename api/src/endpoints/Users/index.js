const { Users } = require('../../Models');

async function routes(fastify) {

    fastify.get(`/`, async (request, reply) => {
        await request.jwtVerify();

        if (request.user.perms !== 'admin') {
            return reply.code(403).send({
                message: 'You do not have permission to do this'
            });
        }

        let users = await Users.find({}).select('-password');

        return reply.send(users);
    })

    fastify.get(`/:id`, async (request, reply) => {
        await request.jwtVerify();

        if (request.user.perms !== 'admin') {
            return reply.code(403).send({
                message: 'You do not have permission to access this resource'
            });
        }

        let user = await Users.findOne({
            where: {
                _id: request.params.id
            }
        });

        if(!user) {
            return reply.code(404).send({
                message: 'User not found'
            });
        }

        return reply.send({
            id: user.id,
            username: user.username,
            email: user.email,
            perms: user.perms,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    });
}

module.exports = routes;