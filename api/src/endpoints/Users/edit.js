const {Users} = require("../../Models");
const cryptoJS = require("crypto-js");
const {isAdmin} = require("../../Utils/Authorization");

module.exports = {
    async routes(fastify) {
        fastify.post(`/:id/username`, async (request, reply) => {
            await isAdmin(request, reply)

            if (!request.body || !request.body.username) {
                return reply.code(400).send({
                    error: 'Username is required'
                });
            }

            if (request.body.username.length < 3 || request.body.username.length > 20) {
                return reply.code(400).send({
                    error: 'Username must be between 3 and 20 characters'
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
                            error: 'Username already exists'
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
                        permissions: user.permissions,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    });
                }).catch(() => {
                    return reply.code(500).send({
                        error: 'An error occurred'
                    });
                });
            }).catch(() => {
                return reply.code(500).send({
                    error: 'An error occurred'
                });
            })
        });

        fastify.post(`/:id/email`, async (request, reply) => {
            await isAdmin(request, reply)

            if (!request.body || !request.body.email) {
                return reply.code(400).send({
                    error: 'Email is required'
                });
            }

            if (!/^[a-zA-Z\d.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/.test(request.body.email)) {
                return reply.code(400).send({
                    error: 'Email is not valid'
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
                            error: 'Email already exists'
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
                        permissions: user.permissions,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    });
                }).catch(() => {
                    return reply.code(500).send({
                        error: 'An error occurred'
                    });
                });
            }).catch(() => {
                return reply.code(500).send({
                    error: 'An error occurred'
                });
            });
        });

        fastify.post(`/:id/password`, async (request, reply) => {
            await isAdmin(request, reply)

            if (!request.body || !request.body.password) {
                return reply.code(400).send({
                    error: 'Password is required'
                })
            }

            if (request.body.password.length < 8) {
                return reply.code(400).send({
                    error: 'Password must be at least 8 characters'
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
                    permissions: user.permissions,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                });
            }).catch(() => {
                return reply.code(500).send({
                    error: 'An error occurred'
                });
            });
        });

        fastify.post(`/:id/permissions`, async (request, reply) => {
            await isAdmin(request, reply)

            if (!request.body || !request.body.permissions) {
                return reply.code(400).send({
                    error: 'A permission is required'
                })
            }

            switch (request.body.permissions) {
                case 'admin':
                case 'user':
                    break;
                default:
                    return reply.code(400).send({
                        error: 'Permission must be either admin or user'
                    })
            }

            Users.findOneAndUpdate({
                _id: request.params.id
            }, {
                permissions: request.body.permissions,
                updatedAt: Date.now()
            }, {
                new: true
            }).then(user => {
                return reply.send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    permissions: user.permissions,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                });
            }).catch(() => {
                return reply.code(500).send({
                    error: 'An error occurred'
                });
            });
        });
    }
}