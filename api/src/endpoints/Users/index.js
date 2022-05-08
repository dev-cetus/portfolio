const { Users } = require('../../Models');
const cryptoJS = require("crypto-js");

async function routes(fastify) {

    fastify.get(`/`, async (request, reply) => {
        await request.jwtVerify();

        if (request.user.perms !== 'admin') {
            return reply.code(403).send({
                message: 'You do not have permission to access this resource'
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

    fastify.post(`/:id/username`, async (request, reply) => {
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
        })
    });

    fastify.post(`/:id/email`, async (request, reply) => {
        await request.jwtVerify();

        if (request.user.perms !== 'admin') {
            return reply.code(403).send({
                message: 'You do not have permission to access this resource'
            });
        }

        if (!request.body || !request.body.email) {
            return reply.code(400).send({
                message: 'Email is required'
            });
        }

        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/.test(request.body.email)) {
            return reply.code(400).send({
                message: 'Email is not valid'
            });
        }

        Users.findOne({
            email: {
                $regex: new RegExp(request.body.email, 'i')
            }
        }).then(async user => {
            if (user) {
                if (user.email.toLowerCase() === request.body.email.toLowerCase()) {
                    return reply.code(400).send({
                        message: 'Email already exists'
                    });
                }
            }

            Users.findOneAndUpdate({
                _id: request.params.id
            }, {
                email: request.body.email,
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
    });

    fastify.post(`:id/password`, async (request, reply) => {
        await request.jwtVerify();

        if (request.user.perms !== 'admin') {
            return reply.code(403).send({
                message: 'You do not have permission to access this resource'
            });
        }

        if (!request.body || !request.body.password) {
            return reply.code(400).send({
                message: 'Password is required'
            })
        }

        if (request.body.password.length < 8) {
            return reply.code(400).send({
                message: 'Password must be at least 8 characters'
            })
        }

        Users.findOneAndUpdate({
            _id: request.params.id
        }, {
            password: await cryptoJS.SHA256(request.body.password).toString(),
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
    });

    fastify.post(`:id/perms`, async (request, reply) => {
        await request.jwtVerify();

        if (request.user.perms !== 'admin') {
            return reply.code(403).send({
                message: 'You do not have permission to access this resource'
            });
        }

        if (!request.body || !request.body.perms) {
            return reply.code(400).send({
                message: 'A permission is required'
            })
        }

        switch(request.body.perms) {
            case 'admin':
            case 'user':
                break;
            default:
                return reply.code(400).send({
                    message: 'Permission must be either admin or user'
                })
        }

        Users.findOneAndUpdate({
            _id: request.params.id
        }, {
            perms: request.body.perms,
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
    });
}

module.exports = routes;