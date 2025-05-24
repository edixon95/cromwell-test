const jwt = require("jsonwebtoken");

const isJWTValid = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}

module.exports = isJWTValid;
