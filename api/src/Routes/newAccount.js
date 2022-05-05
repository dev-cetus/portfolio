const { Users } = require('../Models/index');
const cryptoJS = require('crypto-js');
const fastifyJwt = require("@fastify/jwt");

async function routes(fastify) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: async (request, reply) => {
            // verify jwt
            await request.jwtVerify();

            if (request.user.perms !== 'admin') {
                reply.code(403).send({
                    message: 'You do not have permission to do this.'
                });
            }

            if (!request.body) {
                reply.code(400).send({
                    message: 'No data was sent.'
                });
            }

            let { username, email, password, perms } = request.body;

            if (!username || !password || !email || !perms) {
                return reply.code(400).send({
                    message: 'Missing parameters'
                });
            }

            if (username.length < 3 || username.length > 20) {
                return reply.code(400).send({
                    message: 'Username must be between 3 and 20 characters'
                });
            }

            // verify email with regex
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/.test(email)) {
                return reply.code(400).send({
                    message: 'Invalid email'
                });
            }


            // check if username is taken
            let user = await Users.findOne({
                username: {
                    $regex: new RegExp(username, 'i')
                }
            });

            if (user && user.username.toLowerCase() === username.toLowerCase()) {
                return reply.code(400).send({
                    message: 'Username is already taken'
                });
            }

            // check if email is taken
            user = await Users.findOne({
                email: {
                    $regex: new RegExp(email, 'i')
                }
            });

            if (user) {
                return reply.code(400).send({
                    message: 'Email is already taken'
                });
            }

            // verify password size
            if (password.length < 8) {
                return reply.code(400).send({
                    message: 'Password must be at least 8 characters'
                });
            }

            switch(perms) {
                case 'normal':
                case 'admin':
                    break;
                default:
                    return reply.code(400).send({
                        message: 'Invalid permissions'
                    });
            }

            let passwordHash = cryptoJS.SHA256(password).toString();

            Users.create({
                username,
                email,
                password: passwordHash,
                perms
            }).then(user => {
                return reply.send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    perms: user.perms,
                })
            }).catch(() => {
                reply.code(400).send({
                    message: 'Error creating user'
                });
            })
        }
    });

}

module.exports = routes;