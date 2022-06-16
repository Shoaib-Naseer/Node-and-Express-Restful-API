const router = require('express').Router();
const users = require('../controllers/user');

//UPDATE
router.put('/:id', users.updateUser);

//DELETE
router.delete('/:id', users.deleteUser);

//Get User Details
router.get('/:id', users.userDetails);

module.exports = router;
