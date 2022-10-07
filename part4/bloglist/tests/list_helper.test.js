const listHelper = require("../utils/list_helper");
const mocklist = require("./blogs");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has all mock blogs, equals the likes of that", () => {
    expect(listHelper.totalLikes(mocklist)).toBe(36);
  });
});

describe("most favorite blog", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the most favorite blog of that", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("when list has all mock blogs, equals the most favorite blog of that", () => {
    expect(listHelper.favoriteBlog(mocklist)).toEqual(mocklist[2]);
  });
});

describe("the number of blogs the top author has", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the number of blogs the top author of that", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expectResult = { author: "Edsger W. Dijkstra", blogs: 1 };
    expect(result).toEqual(expectResult);
  });

  test("when list has all mock blogs, equals the number of blogs the top author of that", () => {
    const expectResult = { author: "Robert C. Martin", blogs: 3 };
    expect(listHelper.mostBlogs(mocklist)).toEqual(expectResult);
  });
});

describe("whose blog posts have the largest amount of likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals whose blog posts have the largest amount of likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const expectResult = { author: "Edsger W. Dijkstra", likes: 5 };
    expect(result).toEqual(expectResult);
  });

  test("when list has all mock blogs, equals whose blog posts have the largest amount of likes", () => {
    const expectResult = { author: "Edsger W. Dijkstra", likes: 17 };
    expect(listHelper.mostLikes(mocklist)).toEqual(expectResult);
  });
});
