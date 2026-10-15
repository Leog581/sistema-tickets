const { Ticket, User } = require('../models');

const createTicket = async (req, res) => {
    const { title, description } = req.body;

    if(!title || !description){
        return res.status(400).json({ error: 'Título y descripción son obligatorios'});
    }
    const ticket = await Ticket.create({
        title,
        description,
        userId: req.user.id
    });
    return res.status(201).json(ticket);
};

const listMyTickets = async (req, res) => {
    const ticketList = await Ticket.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']]
    });
    res.json(ticketList);
};

const getAllTickets = async (req, res) => {
    const tickets = await Ticket.findAll({
        include: [{
            model: User,
            attributes: ['name', 'email']
        }],
        order: [['createdAt', 'DESC']]
    });
    res.json(tickets);
};

const getTicketById = async (req, res) => {
    const id = Number(req.params.id);
    if(Number.isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    } 

    const ticket = await Ticket.findByPk(id);
    if(!ticket){
        return res.status(404).json({ error: 'Ticket no encontrado' });
    }

    const isOwner = ticket.userId === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
        return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json(ticket);
};

const updateTicket = async (req, res) => {
    const id = Number(req.params.id);
    if(Number.isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    } 

    const ticket = await Ticket.findByPk(id);
    if(!ticket){
        return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    if (ticket.userId !== req.user.id) {
        return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    if (ticket.status !== 'open') {
        return res.status(403).json({ error: 'No se puede editar un ticket en proceso o cerrado' });
    }
    const { title, description } = req.body;
    if (!title && !description) {
        return res.status(400).json({ error: 'Tenés que enviar al menos un campo para editar' });
    }
    await ticket.update({ title, description });
    res.json(ticket);
};

module.exports = { createTicket, listMyTickets, getAllTickets, getTicketById, updateTicket };


