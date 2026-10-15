const express = require('express');
const router = express.Router();
const { createTicket, listMyTickets, getAllTickets, getTicketById, updateTicket } = require('../controllers/ticketController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

// Rutas - endpoints
router.post('/', authenticate, createTicket);
router.get('/', authenticate, listMyTickets);
router.get('/all', authenticate, adminOnly, getAllTickets);
router.get('/:id', authenticate, getTicketById);
router.patch('/:id', authenticate, updateTicket);

module.exports = router;