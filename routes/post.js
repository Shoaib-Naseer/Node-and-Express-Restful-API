const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');
const posts = require('../controllers/post');

//Create Post
router.post('/create', posts.newPost);

//Update Post
router.put('/:id', posts.updatePost);

//Delete Post
router.delete('/:id', posts.deletePost);

//Get single Post Details
router.get('/:id', posts.detailPost);

//Get All Post Details
router.get('/', posts.allPosts);

module.exports = router;
