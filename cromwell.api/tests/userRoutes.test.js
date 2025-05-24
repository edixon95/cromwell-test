const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

let token;
let userId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User routes", () => {
    test("POST /register should create a new user", async () => {
        const res = await request(app).post("/user/register").send({
            username: "testuser",
            email: "test@example.com",
            password: "!Password1"
        });
        expect(res.status).toBe(200);
    });

    test("POST /register should return 400 for duplicate email or username", async () => {
        const res = await request(app).post("/user/register").send({
            username: "testuser",
            email: "test@example.com",
            password: "!Password1"
        });
        expect(res.statusCode).toBe(400);
    });

    test("POST /login should authenticate user and return token", async () => {
        const res = await request(app).post("/user/login").send({
            email: "test@example.com",
            password: "!Password1"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
        userId = res.body.user._id;
    });

    test("GET /getAll should return users (authorized)", async () => {
        const res = await request(app)
            .get("/user/getAll")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /getSingle should return a single user by ID", async () => {
        const res = await request(app)
            .get(`/user/getSingle?id=${userId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("PUT /changePassword should update user password", async () => {
        const res = await request(app).put("/user/changePassword").send({
            id: userId,
            oldPassword: "!Password1",
            newPassword: "!Password2"
        });
        expect(res.statusCode).toBe(200);
    });

    
    test("DELETE /delete should remove a user", async () => {
        const res = await request(app).delete(`/user/delete?id=${userId}`);
        expect(res.statusCode).toBe(200);
    });
});
