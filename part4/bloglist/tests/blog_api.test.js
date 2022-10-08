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

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Fuck the society",
    author: "Zweisamkeiten",
    url: "https://zweisamkeiten.github.io",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).toContain("Fuck the society");
});
  const title = blogsAtEnd.map((r) => r.title);
  expect(title).toContain("Fuck the society");
});

afterAll(() => {
  mongoose.connection.close();
});
