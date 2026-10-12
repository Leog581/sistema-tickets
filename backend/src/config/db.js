require('dotenv').config();
const { Sequelize } = require('sequelize');

if(!process.env.DATABASE_URL){
    throw new Error('Falta DATABASE_URL en el archivo .env');
};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions:{ 
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;