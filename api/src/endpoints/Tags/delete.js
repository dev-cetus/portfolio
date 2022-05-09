const {Tags} = require("../../Models");

async function routes(fastify) {

    fastify.delete(`/:id`, async (request, reply) => {
        await request.jwtVerify();

        if (request.user.perms !== "admin") {
            return reply.code(403).send({
                message: "You do not have permission to do this"
            });
        }

        // delete tag
        await Tags.deleteOne({
            _id: request.params.id
        }).then(async (result) => {
            if (result.deletedCount === 0) {
                return reply.code(404).send({
                    message: "Tag not found"
                });
            }
            return reply.code(200).send({
                message: "Tag deleted"
            });
        })
    })

}

module.exports = routes;