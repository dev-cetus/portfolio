const {Tags} = require("../../Models");

module.exports = {
    permissions: ["admin"],
    async routes(fastify) {
        fastify.post(`/`, async (request, reply) => {
            await request.jwtVerify();

            if (!request.body) {
                return reply.code(400).send({
                    error: "No body provided"
                })
            }

            const {name} = request.body;

            if (!name) {
                return reply.code(400).send({
                    error: "Missing required fields"
                });
            }

            // verify if tag name contains only letters
            if (!/^[a-zA-Z]+$/.test(name)) {
                return reply.code(400).send({
                    error: "Tag name must contain only letters (a-zA-Z)"
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
                            error: "Tag already exists"
                        })
                    }
                }

                // create tag
                await Tags.create({
                    name: name
                }).then(() => {
                    return reply.send({
                        success: "Tag created successfully",
                    })
                }).catch(() => {
                    return reply.code(500).send({
                        error: "An error occurred"
                    })
                })
            }).catch(() => {
                return reply.code(500).send({
                    error: "An error occurred",
                })
            })
        })
    }
}