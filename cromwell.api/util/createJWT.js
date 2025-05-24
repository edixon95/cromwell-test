const jwt = require("jsonwebtoken");

const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return token;
};

module.exports = createJWT;