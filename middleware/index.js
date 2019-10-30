const users = require('../users/userDb')
const posts = require('../posts/postDb')

function validateUserId(req, res, next) {
  const { id } = req.params;
  users
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res
          .status(404)
          .json({ message: `User with id of ${id} does not exist` });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving user with id of ${id}: ${err.message}`
      });
    });
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
    const { id } = req.params;
    posts
      .getById(id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        } else {
          res
            .status(404)
            .json({ message: `Post with id of ${id} does not exist` });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: `Error retrieving post with id of ${id}: ${err.message}`
        });
      });
  }

module.exports = {
    validateUserId,
    validateUser,
    validatePost,
    validatePostId
}