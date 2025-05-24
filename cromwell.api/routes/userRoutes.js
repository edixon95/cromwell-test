const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authorise = require("../middleware/authorise");
const createJWT = require("../util/createJWT");

router.post("/register", async (request, result) => {
    try {
        const { username, email, password } = request.body;
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return result.status(400).json({ message: `Account with this ${existingUser.email === email ? "email" : "username"} already exists` });
        }
        const user = new User({ username, email, password });
        await user.save();
        result.status(200).json({ message: "Success" });
    } catch (error) {
        result.status(500).json({ message: "Internal server error" });
    };
});

router.post("/login", async (request, result) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user)
            return result.status(400).json({ message: "Email is incorrect" });

        if (!await user.comparePassword(password))
            return result.status(400).json({ message: "Password is incorrect" });

        const token = createJWT(user);

        const { password: _, ...userWithoutPassword } = user.toObject();

        result.status(200).json({ token, user: userWithoutPassword });
    } catch (error) {
        result.status(500).json({ message: "Internal server error" });
    };
});

router.get("/getAll", authorise, async (request, result) => {
    try {
        const users = await User.find({});

        return result.status(200).json(users);
    } catch (error) {
        result.status(500).json({ message: "Internal server error" })
    };
});

router.get("/getSingle", authorise, async (request, result) => {
    try {
        const id = request.query.id;

        if (!id)
            return result.status(400).json({ message: "ID required" });

        const user = await User.findById(id);
        if (!user)
            return result.status(404).json({ message: "User not found" });

        result.status(200).json(user);
    } catch (error) {
        result.status(500).json({ message: "Internal server error" })
    };
});

router.delete("/delete", authorise, async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/changePassword", authorise, async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;

        if (!id || !oldPassword || !newPassword)
            return res.status(400).json({ message: "Missing required fields" });

        const user = await User.findById(id).select("+password");
        if (!user)
            return res.status(404).json({ message: "User not found" });


        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch)
            return res.status(401).json({ message: "Old password is incorrect" });


        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});



router.post("/refreshToken", authorise, async (request, result) => {
    try {
        const user = await User.findById(request.user.id);

        if (!user)
            return result.status(404).json({ message: "User not found" });

        const newToken = createJWT(user);

        result.status(200).json({ token: newToken });
    } catch (error) {
        result.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router;