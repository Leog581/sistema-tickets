const express = require('express');
const router = express.Router();
const { createTicket, listMyTickets, getAllTickets, getTicketById, updateTicket, changeTicketStatus, deleteTicket } = require('../controllers/ticketController');
const { authenticate, adminOnly } = require('../middlewares/authMiddleware');

// Rutas - endpoints
router.post('/', authenticate, createTicket);
router.get('/', authenticate, listMyTickets);
router.get('/all', authenticate, adminOnly, getAllTickets);
router.get('/:id', authenticate, getTicketById);
router.patch('/:id', authenticate, updateTicket);
router.patch('/:id/status', authenticate, adminOnly, changeTicketStatus)
router.delete('/:id', authenticate, deleteTicket);

module.exports = router;