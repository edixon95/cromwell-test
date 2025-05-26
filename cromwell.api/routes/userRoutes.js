const express = require("express");
const router = express.Router();
const User = require("../models/User");
const checkAuth = require("../middleware/checkAuth");
const createJWT = require("../util/createJWT");
const mongoose = require("mongoose");
const { NotFound, Exception, InternalServerError, Success } = require("../util/responses")

router.post("/register", async (request, result) => {
    try {
        const { username, email, password } = request.body;
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return Exception(result, `Account with this ${existingUser.email === email ? "email" : "username"} already exists`);
        }
        const user = new User({ username, email, password });
        await user.save();
        Success(result);
    } catch (error) {
        InternalServerError(result);
    };
});

router.post("/login", async (request, result) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user)
            return NotFound(result, "Account");

        if (!await user.comparePassword(password))
            return Exception(result, "Password is incorrect");

        const token = createJWT(user);

        const { password: _, ...userWithoutPassword } = user.toObject();
        Success(result, { token, user: userWithoutPassword });
    } catch (error) {
        InternalServerError(result);
    };
});

router.get("/getAll", checkAuth, async (request, result) => {
    try {
        const users = await User.find({});

        Success(result, users);
    } catch (error) {
        InternalServerError(result);
    };
});

router.get("/getSingle", checkAuth, async (request, result) => {
    try {
        const id = request.query.id;

        if (!id)
            return Exception(result, "ID required");

        const user = await User.findById(id);
        if (!user)
            return NotFound(result, "User");

        Success(result, user);
    } catch (error) {
        InternalServerError(result);
    };
});

router.delete("/delete", checkAuth, async (request, result) => {
    try {
        const { id } = request.query;

        if (!id)
            return Exception(result, "User ID is required");

        if (!mongoose.Types.ObjectId.isValid(id))
            return NotFound(result, "User");


        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser)
            return NotFound(result, "User");

        Success(result);
    } catch (error) {
        InternalServerError(result);
    }
});

router.put("/changePassword", checkAuth, async (request, result) => {
    try {
        const { id, oldPassword, newPassword } = request.body;

        if (!id || !oldPassword || !newPassword)
            return Exception(result, "Missing required fields");

        if (!mongoose.Types.ObjectId.isValid(id))
            return NotFound(result, "User");


        const user = await User.findById(id).select("+password");
        if (!user)
            return NotFound(result, "User");


        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch)
            return Exception(result, "Old password is incorrect");


        user.password = newPassword;
        await user.save();

        Success(result);
    } catch (error) {
        InternalServerError(result);
    }
});

router.post("/refreshToken", checkAuth, async (request, result) => {
    try {
        const user = await User.findById(request.user.id);

        if (!user)
            return NotFound(result, "User");

        const newToken = createJWT(user);

        Success(result, { token: newToken });
    } catch (error) {
        InternalServerError(result);
    }
});

module.exports = router;