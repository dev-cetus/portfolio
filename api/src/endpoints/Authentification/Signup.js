const { Users } = require('../../Models');
const cryptoJS = require('crypto-js');

module.exports = {
    permissions: ["admin"],
    async routes(fastify) {
        fastify.post(`/`, async (request, reply) => {
            // verify jwt
            await request.jwtVerify();

            if (!request.body) {
                reply.code(400).send({
                    error: 'No data was sent.'
                });
            }

            let { username, email, password, permissions } = request.body;

            if (!username || !password || !email || !permissions) {
                return reply.code(400).send({
                    error: 'Missing parameters'
                });
            }

            if (!username.match(/^\w{3,16}$/)) {
                return reply.code(400).send({
                    error: 'Username must be between 3 and 16 characters long and can only contain letters, numbers and underscores.'
                })
            }

            // verify email with regex
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/.test(email)) {
                return reply.code(400).send({
                    error: 'Invalid email'
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
                    error: 'Username is already taken'
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
                    error: 'Email is already taken'
                });
            }

            // verify password size
            if (password.length < 8) {
                return reply.code(400).send({
                    error: 'Password must be at least 8 characters'
                });
            }

            switch(permissions) {
                case 'user':
                case 'admin':
                    break;
                default:
                    return reply.code(400).send({
                        error: 'Invalid permissions'
                    });
            }

            let passwordHash = cryptoJS.SHA256(password).toString();

            Users.create({
                username,
                email,
                password: passwordHash,
                permissions
            }).then(user => {
                return reply.code(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    permissions: user.permissions,
                })
            }).catch(() => {
                reply.code(400).send({
                    error: 'Error creating user'
                });
            })
        })
    }
}