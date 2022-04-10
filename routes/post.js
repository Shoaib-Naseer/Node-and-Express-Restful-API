const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');

//Create Post
router.post('/create', async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username: username });

  if (user) {
    const newPost = new Post(req.body);
    try {
      // To save it to the Database
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json('User doesnt Exist');
  }
});

//Update Post
router.put('/:id', async (req, res) => {
  try {
    //first we will check whether the id exists in database
    const post = await Post.findById(req.params.id);
    //we have to match the username to verify that this post is by same user-name or not
    try {
      if (req.body.username === post.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(500).json('You can Only Update Your Post');
      }
    } catch (err) {}
  } catch (err) {
    res.status(200).json(err);
  }
});

//Delete Post
router.delete('/:id', async (req, res) => {
  try {
    //first we will check whether the id exists in database
    const post = await Post.findById(req.params.id);
    //we have to match the username to check whether this post is by same user or not
    try {
      console.log(req.body.username);
      console.log(post.username);
      if (req.body.username === post.username) {
        try {
          await post.delete();
          res.status(200).json('SuccessFully Deleted');
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(500).json('You can Only Delete Your Post');
      }
    } catch (err) {}
  } catch (err) {
    res.status(200).json(err);
  }
});

//Get Post Details
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Post Details
router.get('/', async (req, res) => {
  try {
    //If we want to list all posts be a specific user or category then
    //we have to parse from query string the user and category
    let posts;
    const username = req.query.user;
    const category = req.query.cat;
    if (username) {
      //This will list all the posts from a user passed in URL
      posts = await Post.find({ username: username });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
