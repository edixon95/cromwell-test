const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userModel = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
});

userModel.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userModel.methods.comparePassword = function (compareWith) {
    return bcrypt.compare(compareWith, this.password);
};

module.exports = mongoose.model("User", userModel);