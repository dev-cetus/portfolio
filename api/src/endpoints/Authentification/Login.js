const { Users } = require('../../Models');
const cryptoJS = require('crypto-js');

module.exports = {
    permissions: ["user"],
    async routes(fastify) {
        fastify.post(`/`, async (request, reply) => {
            if (!request.body) {
                reply.code(400).send({
                    error: 'No body found in request'
                });
            }

            let {username, password} = request.body;

            if (!username || !password) {
                return reply.code(400).send({
                    error: 'Missing parameters'
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
                    error: 'Invalid credentials'
                });
            }

            let token = fastify.jwt.sign({
                id: user.id,
                username: user.username,
                permissions: user.permissions,
                createdAt: user.createdAt,
                iat: Date.now(),
            });

            return reply.code(200).send({
                token: token,
                exp: fastify.jwt.decode(token).exp
            })
        })
    }
}