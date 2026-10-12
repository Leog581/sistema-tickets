const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class Ticket extends Model {}

Ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('open','in_progress','closed'),
            allowNull: false,
            defaultValue: 'open'
        },
    },
    {
        sequelize,
        modelName: 'Ticket',
        timestamps: true
    }
);

module.exports = Ticket;