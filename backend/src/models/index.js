const User = require('./User');
const Ticket = require('./Ticket');
const sequelize = require('../config/db');

User.hasMany(Ticket, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE'
});

Ticket.belongsTo(User, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE'
});

module.exports = { User, Ticket, sequelize };