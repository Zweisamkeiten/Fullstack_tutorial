const { groupBy, reduce } = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((previous, current) => {
    return previous + current.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const indexOfMostLike = likes.indexOf(Math.max(...likes));
  return blogs[indexOfMostLike];
};

const mostBlogs = (blogs) => {
  const groupbyAuthor = groupBy(blogs, (blog) => blog.author);
  const theNumberOfBlog = Object.values(groupbyAuthor).map(
    (author) => author.length
  );
  const theIndexOfTopNumber = theNumberOfBlog.indexOf(
    Math.max(...theNumberOfBlog)
  );
  const returnObject = {
    author: Object.keys(groupbyAuthor)[theIndexOfTopNumber],
    blogs: theNumberOfBlog[theIndexOfTopNumber],
  };

  return returnObject;
};

const mostLikes = (blogs) => {
  const groupbyAuthor = groupBy(blogs, (blog) => blog.author);
  const allLikesOfAuthor = Object.values(groupbyAuthor).map((author) =>
    author.reduce((pre, cur) => pre + cur.likes, 0)
  );
  const theIndexOfMostLikes = allLikesOfAuthor.indexOf(
    Math.max(...allLikesOfAuthor)
  );
  const returnObject = {
    author: Object.keys(groupbyAuthor)[theIndexOfMostLikes],
    likes: allLikesOfAuthor[theIndexOfMostLikes],
  };

  return returnObject;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
