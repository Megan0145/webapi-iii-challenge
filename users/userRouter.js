const express = require('express');
const users = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving users: " + err.message})
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    users.getById(id)
    .then(user => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({message: `User with id of ${id} does not exist`})
        }
    })
    .catch(err => {
        res.status(500).json({message: `Error retrieving user with id of ${id}: ${err.message}`})
    })
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    users.getUserPosts(id)
    .then(posts => {
        if(posts.length){
             res.status(200).json(posts)
        } else {
            res.status(200).json({message: "This user doesn't have any posts"})
        }
    })
    .catch(err => {
        res.status(500).json({message: `Error retrieving posts for user with id of ${id}: ${err.message}`})
    })
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
