const isJWTValid = require("../util/isJWTValid");

const hasToken = (header) => {
    return header && header.startsWith("Bearer ");
};

const checkAuth = (request, result, next) => {
    const header = request.headers?.authorization;

    if (!hasToken(header))
        return result.status(401).json({ message: "Unauthorized" });

    const token = header.split(" ")[1];
    const decoded = isJWTValid(token);

    if (!decoded)
        return result.status(401).json({ message: "Unauthorized" });

    request.user = decoded;
    next();
}

module.exports = checkAuth;