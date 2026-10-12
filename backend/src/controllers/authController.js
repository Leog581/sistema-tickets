const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Funciones auxiliares
function publicUser(user){
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
}

// Controladores
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios'});
    }
    if(password.length < 6){
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if(existingUser) {
        return res.status(409).json({ error: 'Email ya registrado' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email: normalizedEmail,
        passwordHash,
        role: 'user'
    });
    const token = jwt.sign(
        { id: user.id, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: '8h'}
    );
    return res.status(201).json({
        user: publicUser(user),
        token,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ error: 'Email y contraseña son obligatorios'});
    }
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if(!user){
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const passwordDb = await bcrypt.compare(password, user.passwordHash);
    if(!passwordDb){
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
        { id: user.id, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: '8h'}
    );
    return res.status(200).json({
        user: publicUser(user),
        token,
    });
};

const me = (req, res) => {
    res.json({ user: publicUser(req.user) })
};

module.exports = { register, login, me };