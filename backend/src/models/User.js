const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true }
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user','admin'),
            defaultValue: 'user'
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true
    }
);

module.exports = User;