module.exports = {
    async isAdmin(req, res) {
        await req.jwtVerify();
        if (!req.user.role.includes("admin")) {
            return res.code(403).send({
                message: "Forbidden"
            });
        }
    },
    async isUser(req, res) {
        await req.jwtVerify();
        if (!req.user.role.includes("user")) {
            return res.code(403).send({
                message: "Forbidden"
            });
        }
    }
}