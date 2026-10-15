require('dotenv').config();
const bcrypt = require('bcrypt');
const { User, sequelize } = require('../models');

async function createAdmin(){
    //Leer argumentos de la terminal
    const [, , name, email, password] = process.argv;

    //Validación
    if (!name || !email || !password) {
        console.error('Uso: node src/scripts/createAdmin.js "Nombre" "email" "password"');
        process.exit(1);
    }

    const normalizedEmail = email.trim().toLowerCase();

    //Buscar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
        // Si ya existe le asigna el rol de admin
        await existingUser.update({ role: 'admin' });
        console.log(`Usuario promovido a admin: ${existingUser.email}`);
    } else {
        // Si no existe crea el usuario nuevo con el rol de admin
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email: normalizedEmail,
            passwordHash,
            role: 'admin'
        });
        console.log(`Admin creado: ${newUser.email}`);
    }

    // Cerrar la conexion a la base
    await sequelize.close();
}

createAdmin().catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
    })