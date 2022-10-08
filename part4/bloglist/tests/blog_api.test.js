const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper.js");

const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promisseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promisseArray);

  console.log("done");
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("returned blog's unique identifier is named id", async () => {
  const returnedBlogs = await helper.blogsInDb();

  expect(returnedBlogs[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
