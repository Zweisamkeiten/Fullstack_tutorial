const dummy = (blogs) => {
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

module.exports = { dummy, totalLikes, favoriteBlog };
