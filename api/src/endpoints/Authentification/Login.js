const { Users } = require('../../Models');
const cryptoJS = require('crypto-js');

async function routes(fastify) {
    fastify.post(`/`, async (request, reply) => {
        if (!request.body) {
            reply.code(400).send({
                message: 'No body found in request'
            });
        }

        let {username, password} = request.body;

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
            perms: user.perms,
            createdAt: user.createdAt,
            iat: Date.now(),
        });

        return reply.send({
            token: token,
            exp: fastify.jwt.decode(token).exp
        })
    })
}

module.exports = routes;