const express = require('express');
const posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
    posts.get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong trying to retrieve posts: " + err.message})
    })
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;