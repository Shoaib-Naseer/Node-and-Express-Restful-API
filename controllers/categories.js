const Categories = require('../models/categories');

//Create Categories
const newCat = async (req, res) => {
  try {
    const category = await Categories({ name: req.body.name });
    const savedCat = await category.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get All Categories
const allCat = async (req, res) => {
  try {
    const category = await Categories.find();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { newCat, allCat };
