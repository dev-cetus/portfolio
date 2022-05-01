const { Users } = require('../Models/index');
const cryptoJS = require('crypto-js');

async function routes(fastify) {
    fastify.route({
        method: 'POST',
        url: '/',
        handler: async (request, reply) => {
            let { username, password } = request.body;

            if (!username || !password) {
                return reply.code(400).send({
                    message: 'Missing parameters'
                });
            }

            let user = await Users.findOne({
                username: username
            })

            if (!user) {
                user = await Users.findOne({
                    email: username
                })
            }

            let passwordHash = cryptoJS.SHA256(password).toString();

            if (!user || user.password !== passwordHash) {
                return reply.code(400).send({
                    message: 'Invalid credentials'
                });
            }

            let token = fastify.jwt.sign({
                id: user.id,
                username: user.username,
                iat: Date.now(),
            });

            return reply.send({
                token: token,
                exp: fastify.jwt.decode(token).exp
            })
        }
    });

}

module.exports = routes;