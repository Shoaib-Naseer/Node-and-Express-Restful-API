const router = require('express').Router();
const category = require('../controllers/categories');

//Create Categories
router.post('/create', category.newCat);

//Get All Categories
router.get('/', category.allCat);

module.exports = router;
