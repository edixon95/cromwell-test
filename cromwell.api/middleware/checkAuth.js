const isJWTValid = require("../util/isJWTValid");
const { NotAuthorized } = require("../util/responses")

const hasToken = (header) => {
    return header && header.startsWith("Bearer ");
};

const checkAuth = (request, result, next) => {
    const header = request.headers?.authorization;

    if (!hasToken(header))
        return NotAuthorized(result)

    const token = header.split(" ")[1];
    const decoded = isJWTValid(token);

    if (!decoded)
        return NotAuthorized(result)

    request.user = decoded;
    next();
}

module.exports = checkAuth;