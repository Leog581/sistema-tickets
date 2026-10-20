require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { User, sequelize } = require('./models');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Endpoint testeo base de datos
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Ruta Keep-Alive (para el cron de Vercel)
app.get('/api/cron/keep-alive', async (req, res) => {
    const authHeader = req.headers.authorization;
    
    // Verificar el secreto
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    // Hacer una consulta real a la base para generar actividad
    const userCount = await User.count();
    
    res.json({ status: 'ok', message: 'Base de datos activa', users: userCount });
});

// Rutas - Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

// Inicialización del servidor
// Función para arrancar en local
async function startServer() {
    try {
        await sequelize.authenticate();
        
        // Solo hacemos sync en local
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync();
        }

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// Si estamos en Vercel (producción), exportamos la app. Si no, arrancamos el servidor.
if (process.env.NODE_ENV !== 'production') {
    startServer();
}

module.exports = app;