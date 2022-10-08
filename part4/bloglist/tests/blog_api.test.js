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

test("likes property defaults to value 0 if it is missing from the request", async () => {
  const newBlog = {
    title: "Fuck the society",
    author: "Zweisamkeiten",
    url: "https://zweisamkeiten.github.io",
  };

  const response = await api.post("/api/blogs").send(newBlog);
  const returnedBlog = response.body;

  expect(returnedBlog.likes).toBe(0);
});

test("verify that if the title or url properties are missing", async () => {
  const newBlog1 = {
    author: "Zweisamkeiten",
    url: "https://zweisamkeiten.github.io",
  };

  await api.post("/api/blogs").send(newBlog1).expect(400);

  const newBlog2 = {
    title: "Fuck the society",
    author: "Zweisamkeiten",
  };

  await api.post("/api/blogs").send(newBlog2).expect(400);
});

describe("delection of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const ids = blogsAtEnd.map((r) => r.id);
    expect(ids).not.toContain(blogToDelete.id);
  });
});

test("update the amount of likes for a blog post", async () => {
  const likes = { likes: 2 };
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(likes).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  const blogUpdated = blogsAtEnd[0];
  expect(blogUpdated.likes).toBe(2);
});

afterAll(() => {
  mongoose.connection.close();
});
