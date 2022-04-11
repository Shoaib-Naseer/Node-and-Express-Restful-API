const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');

//UPDATE
const updateUser = async (req, res) => {
  //comparing the id from the url and body
  //update requires the id which will send from the URL and BODY by Front-End
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json('You can only update your Account');
  }
};

//DELETE
const deleteUser = async (req, res) => {
  //comparing the id from the url and body
  //Delete requires the id which will send from the URL and BODY by Front-End
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        //Also it will delete all Postsfrom post collections By the User
        await Post.deleteMany({ username: user.use });
        //It will delete user account from DB
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('SuccessFully Deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json('User Not Found');
    }
  } else {
    res.status(500).json('You can delete only your Account');
  }
};

//Get User Details
const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json('user dont exist');
    } else {
      //Extracting User Information without Password
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { updateUser, userDetails, deleteUser };
