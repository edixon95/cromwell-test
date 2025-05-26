const jwt = require("jsonwebtoken");

const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            issued: `cromwell${new Date().toISOString()}${user._id}`
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return token;
};

module.exports = createJWT;