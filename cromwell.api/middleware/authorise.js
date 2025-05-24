const isJWTValid = require("../util/isJWTValid");

const hasToken = (header) => {
    return header && header.startsWith("Bearer ");
};

const authorise = (request, result, next) => {
    const header = request.headers.authorization;

    if (!hasToken(header))
        return result.status(401).json({ message: "Token not provided" });

    const token = header.split(" ")[1];
    const decoded = isJWTValid(token);

    if (!decoded)
        return result.status(403).json({ message: "Invalid token" });

    request.user = decoded;
    next();
}

module.exports = authorise;