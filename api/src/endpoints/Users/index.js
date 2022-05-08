const { Users } = require('../../Models');

async function routes(fastify) {

    fastify.route({
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            await request.jwtVerify();

            if (request.user.perms !== 'admin') {
                return reply.code(403).send({
                    message: 'You do not have permission to access this resource'
                });
            }

            let users = await Users.find({}).select('-password');

            return reply.send(users);
        }
    })

    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: async (request, reply) => {
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
        }
    });

    fastify.route({
        method: 'POST',
        url: '/:id/username',
        handler: async (request, reply) => {
            await request.jwtVerify();

            if (request.user.perms !== 'admin') {
                return reply.code(403).send({
                    message: 'You do not have permission to access this resource'
                });
            }

            if (!request.body || !request.body.username) {
                return reply.code(400).send({
                    message: 'Username is required'
                });
            }

            if (request.body.username.length < 3 || request.body.username.length > 20) {
                return reply.code(400).send({
                    message: 'Username must be between 3 and 20 characters'
                });
            }

            Users.findOne({
                username: {
                    $regex: new RegExp(request.body.username, 'i')
                }
            }).then(async user => {
                if (user) {
                    if (user.username.toLowerCase() === request.body.username.toLowerCase()) {
                        return reply.code(400).send({
                            message: 'Username already exists'
                        });
                    }
                }
                console.log(request.params.id);
                Users.findOneAndUpdate({
                    _id: request.params.id
                }, {
                    username: request.body.username,
                    updatedAt: Date.now()
                }, {
                    new: true
                }).then(user => {
                    return reply.send({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        perms: user.perms,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    });
                }).catch(() => {
                    return reply.code(500).send({
                        message: 'An error occurred'
                    });
                });
            }).catch(() => {
                return reply.code(500).send({
                    message: 'An error occurred'
                });
            });
        }
    })
}

module.exports = routes;