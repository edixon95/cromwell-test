require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
        app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));
    } catch (error) {
        console.error("Database connection error: ", error);
    };
};

startServer();

module.exports = app;