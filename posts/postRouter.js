const express = require("express");
const posts = require("./postDb");
const router = express.Router();
const { validatePostId } = require('../middleware')

router.get("/", (req, res) => {
  posts
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: "Something went wrong trying to retrieve posts: " + err.message
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  posts
    .getById(req.post.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: "Something went wrong trying to retrieve post:" + err.message
        });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  posts
    .remove(req.post.id)
    .then(() => {
      res
        .status(200)
        .json({ message: `Post with id ${req.post.id} successfully deleted` });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message:
            "Something went wrong trying to delete this post: " + err.message
        });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  posts
    .update(req.post.id, req.body)
    .then(() => {
      res
        .status(200)
        .json({
          message: `Post with id of ${req.post.id} successfully updated`,
          new_post: req.body
        });
    })
    .catch(err => {
      res.json({ message: err.message });
    });
});

// custom middleware (Imported from middleware folder)


module.exports = router;
