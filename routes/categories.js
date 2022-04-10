const router = require('express').Router();
const req = require('express/lib/request');
const Categories = require('../models/categories');

//Create Categories
router.post('/create', async (req, res) => {
  try {
    const category = await Categories({ name: req.body.name });
    const savedCat = await category.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Categories
router.get('/', async (req, res) => {
  try {
    const category = await Categories.find();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
