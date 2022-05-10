const {Tags} = require("../../Models");

module.exports = {
    permissions: ["admin"],
    async routes(fastify) {
        fastify.delete(`/:id`, async (request, reply) => {
            await request.jwtVerify();

            // delete tag
            await Tags.deleteOne({
                _id: request.params.id
            }).then(async (result) => {
                if (result.deletedCount === 0) {
                    return reply.code(404).send({
                        error: "Tag not found"
                    });
                }
                return reply.code(200).send({
                    error: "Tag deleted"
                });
            })
        })
    }
}