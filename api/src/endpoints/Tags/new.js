const {Tags} = require("../../Models");

async function routes(fastify) {

    fastify.post(`/`, async (request, reply) => {
        await request.jwtVerify();

        if (request.user.perms !== "admin") {
            return reply.code(403).send({
                message: "You do not have permission to do this"
            });
        }

        if (!request.body) {
            return reply.code(400).send({
                message: "No body provided"
            })
        }

        const {name} = request.body;

        if (!name) {
            return reply.code(400).send({
                message: "Missing required fields"
            });
        }

        // verify if tag name contains only letters
        if (!/^[a-zA-Z]+$/.test(name)) {
            return reply.code(400).send({
                message: "Tag name must contain only letters (a-zA-Z)"
            });
        }

        // verify if tag name already exists
        await Tags.findOne({
            name: {
                $regex: new RegExp(name, "i")
            }
        }).then(async tag => {
            if (tag) {
                if (tag.name.toLowerCase() === name.toLowerCase()) {
                    return reply.code(400).send({
                        message: "Tag already exists"
                    })
                }
            }

            // create tag
            await Tags.create({
                name: name
            }).then(() => {
                return reply.send({
                    message: "Tag created successfully",
                })
            }).catch(() => {
                return reply.code(500).send({
                    message: "An error occurred"
                })
            })
        }).catch(() => {
            return reply.code(500).send({
                message: "An error occurred",
            })
        })
    })

}

module.exports = routes;