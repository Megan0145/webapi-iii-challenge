const express = require("express");
const users = require("./userDb");
const postDB = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message:
            "Something went wrong trying to create new user: " + err.message
        });
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
  postDB
    .insert({ user_id: req.params.id, text: req.body.text })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message:
            "Something went wrong trying to create new post: " + err.message
        });
    });
});

router.get("/", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error retrieving users: " + err.message });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  users
    .getUserPosts(req.user.id)
    .then(posts => {
      if (posts.length) {
        res.status(200).json(posts);
      } else {
        res.status(200).json({ message: "This user doesn't have any posts" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error retrieving posts for user with id of ${id}: ${err.message}`
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  users
    .remove(req.user.id)
    .then(user => {
      res
        .status(200)
        .json({
          message: `User with id of ${req.user.id} successfully deleted`
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: `Something ewnt wrong deleting the user with the id of ${req.user.id}: ${err.message}`
        });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  users
    .update(req.user.id, req.body)
    .then(user => {
      res.status(200).json({message: `User with id of ${req.user.id} updated successfully`, id: req.user.id, changes: req.body});
    })
    .catch(err => {
        res
        .status(500)
        .json({
          message: `Something went wrong trying to update user with id of ${req.user.id}: ${err.message}`
        });
    });
});

//custom middleware

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

module.exports = router;
