const { Users } = require('../../Models');
const {isAdmin} = require("../../Utils/Authorization");

module.exports = {
    async routes(fastify) {
        fastify.get(`/`, async (request, reply) => {
            await isAdmin(request, reply);

            let users = await Users.find({}).select('-password');

            return reply.send(users);
        })

        fastify.get(`/:id`, async (request, reply) => {
            await isAdmin(request, reply);

            if (request.user.permissions !== 'admin') {
                return reply.code(403).send({
                    error: 'You do not have permission to access this resource'
                });
            }

            let user = await Users.findOne({
                where: {
                    _id: request.params.id
                }
            });

            if (!user) {
                return reply.code(404).send({
                    error: 'User not found'
                });
            }

            return reply.send({
                id: user.id,
                username: user.username,
                email: user.email,
                permissions: user.permissions,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        });
    }
}