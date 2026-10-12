const express = require('express');
const router = express.Route();
const { register, login, me } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, me);

module.exports = router;