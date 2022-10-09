const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  }, 100000);

  test("get all users infos", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "einsam",
      name: "zweisamkeiten",
      password: "fucksociety",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "saalainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  describe("invalid add user operation", () => {
    test("create a user without username or password", async () => {
      const newUser1 = { username: "einsam", name: "haifan" };
      const newUser2 = { password: "fucksociety", name: "haifan" };

      const result1 = await api
        .post("/api/users")
        .send(newUser1)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      expect(result1.body.error).toContain(
        "Both username and password must be given"
      );
      const result2 = await api
        .post("/api/users")
        .send(newUser2)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      expect(result2.body.error).toContain(
        "Both username and password must be given"
      );
    });

    test("create a user with password length less than 3 chars", async () => {
      const newUser = { username: "einsam", name: "haifan", password: "12" };
      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      expect(result.body.error).toContain(
        "Password must be at least of 3 characters of length"
      );
    });
  });
});
