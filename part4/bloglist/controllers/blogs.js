const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const user = await User.find({});

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user[0]._id,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  user[0].blogs = user[0].blogs.concat(savedBlog._id);
  await user[0].save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const newblog = request.body;
  if (!newblog.likes) {
    return response.status(400).json({ error: "likes missing" });
  }

  const { likes } = newblog;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: "query" }
  );
  response.status(204).json(updatedBlog);
});

module.exports = blogsRouter;
