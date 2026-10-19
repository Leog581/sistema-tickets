const express = require('express');
const router = express.Router();
const { listUsers, changeUserRole } = require('../controllers/userController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

// Rutas - endpoints (solo admin)
router.get('/', authenticate, adminOnly, listUsers);
router.patch('/:id/role', authenticate, adminOnly, changeUserRole);

module.exports = router;