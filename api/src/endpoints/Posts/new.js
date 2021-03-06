const {Posts, Tags} = require("../../Models");
const {isAdmin} = require("../../Utils/Authorization");


module.exports = {
    async routes(fastify) {
        fastify.post(`/`, async (request, reply) => {
            await isAdmin(request, reply);

            if (!request.body) {
                return reply.code(400).send({
                    error: "No body provided"
                })
            }

            const { title, subTitle, image, content, tags, author} = request.body;

            if (!title || !subTitle || !image || !content || !tags || !author) {
                return reply.code(400).send({
                    error: 'Missing fields'
                });
            }

            // Build slug
            let slug = title.toLowerCase().replace(/[\s$]/g, '-').replace(/[éè]/g, 'e').replace(/à/g, 'a').replace(/ç/g, 'c').replace(/[^a-z\d-]/g, '');

            // Verify if slug is unique
            await Posts.findOne({
                where: {
                    slug
                }
            }).then((slug) => {
                if (slug) {
                    return reply.code(400).send({
                        error: 'Slug already exists, choose another title'
                    });
                }
            });

            // Verify if image link is correct
            if (!image.match(/\.(jpeg|jpg|gif|png)$/)) {
                return reply.code(400).send({
                    error: 'Image link is not valid'
                });
            }

            // Verify if tags exist
            await Tags.find({})
                .then((tags) => {
                    console.log(tags)
                    request.body.tags.forEach((tag) => {
                        if (!tags.find((t) => t.name === tag)) {
                            return reply.code(400).send({
                                error: `Tag \`${tag}\` does not exist`
                            });
                        }
                    });
                })
                .catch(() => {
                    return reply.code(400).send({
                        error: 'Tags do not exist'
                    });
                })

            // Verify if author exists
            await Posts.findOne({
                where: {
                    author
                }
            }).then((author) => {
                if (!author) {
                    return reply.code(400).send({
                        error: 'Author does not exist'
                    });
                }
            })

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
                    success: 'Post created',
                });
            }).catch(() => {
                return reply.code(500).send({
                    error: 'Error creating post',
                })
            })
        })
    }
}