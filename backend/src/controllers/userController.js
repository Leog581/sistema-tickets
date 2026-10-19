const { User } = require('../models');

const listUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['passwordHash']}
    });
    res.json(users);
}

const changeUserRole = async (req, res) => {
    const id = Number(req.params.id);
    if(Number.isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    if(id === req.user.id) {
        return res.status(400).json({ error: 'No puedes cambiar tu propio rol' });
    }

    const { role } = req.body;
    const validRoles = ['user', 'admin'];
    if(!validRoles.includes(role)){
        return res.status(400).json({ error: 'Rol inválido. Debe ser user o admin'});
    }
    const user = await User.findByPk(id);
    if(!user){
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await user.update({ role });
    return res.json({
        id:user.id,
        name: user.name,
        email: user.email,
        role: user.role
    })
}

module.exports = { listUsers, changeUserRole };