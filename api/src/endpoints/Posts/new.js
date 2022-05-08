const {Posts} = require("../../Models");

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

        const { title, subTitle, image, content, tags, author} = request.body;

        if (!title || !subTitle || !image || !content || !tags || !author) {
            return reply.code(400).send({
                message: 'Missing fields'
            });
        }

        // Verify if tags is an array
        if (!Array.isArray(tags)) {
            return reply.code(400).send({
                message: 'Tags must be an array'
            });
        }

        // Verify if image link is correct
        if (!image.match(/\.(jpeg|jpg|gif|png)$/)) {
            return reply.code(400).send({
                message: 'Image link is not valid'
            });
        }

        // Build slug
        let slug = title.toLowerCase().replace(/[\s$]/g, '-').replace(/[éè]/g, 'e').replace(/à/g, 'a').replace(/ç/g, 'c').replace(/[^a-z0-9-]/g, '');
        

        await Posts.create({
            title,
            slug,
            subTitle,
            image,
            content,
            tags,
            author
        }).then(() => {
            return reply.send({
                message: 'Post created',
            });
        }).catch((err) => {
            return reply.code(500).send({
                message: 'Error creating post',
                err
            })
        })
    })
}

module.exports = routes;