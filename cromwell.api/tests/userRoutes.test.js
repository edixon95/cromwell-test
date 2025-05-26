const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

let token;
let userId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Protected routes", () => {
    const protectedRoutes = [
        { method: "get", url: "/user/getAll" },
        { method: "get", url: "/user/getSingle" },
        { method: "put", url: "/user/changePassword" },
        { method: "post", url: "/user/refreshToken" },
        { method: "delete", url: "/user/delete" },
    ];

    protectedRoutes.forEach(({ method, url }) => {
        test(`${method.toUpperCase()} /${url.split("/")[2]} should block unauthorized access`, async () => {
            const res = await request(app)[method](url);

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("Unauthorized");
        });
    });
});

describe("User Signup", () => {
    test("POST /register should create a new user", async () => {
        const res = await request(app).post("/user/register")
            .send({
                username: "testuser",
                email: "test@example.com",
                password: "!Password1"
            });

        expect(res.status).toBe(200);
    });

    test("POST /register should require unique email", async () => {
        const res = await request(app).post("/user/register")
            .send({
                username: "testuserDIFFERENT",
                email: "test@example.com",
                password: "!Password1"
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Account with this email already exists");
    });

    test("POST /register should require unique username", async () => {
        const res = await request(app).post("/user/register")
            .send({
                username: "testuser",
                email: "testDIFFERENT@example.com",
                password: "!Password1"
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Account with this username already exists");
    });
});

describe("User Login", () => {
    test("POST /login should require an existing account", async () => {
        const res = await request(app).post("/user/login")
            .send({
                email: "testDIFFERENT@example.com",
                password: "!Password1"
            });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Account not found");
    });

    test("POST /login should require the correct password", async () => {
        const res = await request(app).post("/user/login")
            .send({
                email: "test@example.com",
                password: "!Password1DIFFERENT"
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Password is incorrect");
    });

    test("POST /login should authenticate user and return token", async () => {
        const res = await request(app).post("/user/login")
            .send({
                email: "test@example.com",
                password: "!Password1"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("user");

        token = res.body.token;
        userId = res.body.user._id;
    });

});

describe("User Get", () => {
    test("GET /getAll should return an array", async () => {
        const res = await request(app)
            .get("/user/getAll")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty("_id");
        expect(res.body[0]).toHaveProperty("username");
    });

    test("GET /getSingle should return a user", async () => {
        const res = await request(app)
            .get(`/user/getSingle?id=${userId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("username");
    });
});

describe("Change Password", () => {
    test("PUT /changePassword should require all fields", async () => {
        const res = await request(app)
            .put("/user/changePassword")
            .set("Authorization", `Bearer ${token}`)
            .send({
                id: "abc123",
                oldPassword: "",
                newPassword: ""
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Missing required fields");
    });

    test("PUT /changePassword should require a valid user (fail)", async () => {
        const res = await request(app)
            .put("/user/changePassword")
            .set("Authorization", `Bearer ${token}`)
            .send({
                id: "abc123",
                oldPassword: "!Password1",
                newPassword: "!Password2"
            });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("User not found");
    });

    test("PUT /changePassword should require the correct old password for the valid user", async () => {
        const res = await request(app)
            .put("/user/changePassword")
            .set("Authorization", `Bearer ${token}`)
            .send({
                id: userId,
                oldPassword: "!Password2",
                newPassword: "!Password2"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Old password is incorrect");
    });

    test("PUT /changePassword should return success upon correctly entering all information", async () => {
        const res = await request(app)
            .put("/user/changePassword")
            .set("Authorization", `Bearer ${token}`)
            .send({
                id: userId,
                oldPassword: "!Password1",
                newPassword: "!Password2"
            });

        expect(res.statusCode).toBe(200);
    });
});

describe("User Auth", () => {
    test("POST /refreshToken should return a new token when getting an old one", async () => {
        const res = await request(app)
            .post("/user/refreshToken")
            .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body.token).not.toBe(token);
        token = res.body.token;
    });
});

describe("Delete User", () => {
    test("DELETE /delete should require a userId", async () => {
        const res = await request(app)
            .delete(`/user/delete`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("User ID is required");
    });

    test("DELETE /delete should require a valid user", async () => {
        const res = await request(app)
            .delete(`/user/delete?id=683463aa26e13d61d087ee94`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("User not found");
    });

    test("DELETE /delete should delete the test user", async () => {
        const res = await request(app)
            .delete(`/user/delete?id=${userId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });
});