const router = require('express').Router();
const auth = require('../controllers/auth');
// Registring a new USer
router.post('/register', auth.register);

// For Login
router.post('/login', auth.login);

module.exports = router;
