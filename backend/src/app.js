require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Endpoint testeo base de datos
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Rutas - Endpoints


// Manejo de errores
app.use(notFound);
app.use(errorHandler);

// Inicialización del servidor
async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });
    } catch (error) {
        if(error.name === 'SequelizeConnectionRefusedError'){
            console.error('Error con la conexión a la base de datos:', error.parent.code);
        } else if(error.name === 'SequelizeHostNotFoundError'){
            console.error('Error con el host de la base de datos:', error.message);
        } else {
            console.error('Error inesperado:', error);
        }
        process.exit(1);
    }
}

startServer();