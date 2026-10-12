const notFound = (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
};

const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'El cuerpo de la petición no es JSON válido' });
    }
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Datos inválidos',
            details: err.errors.map(e => ({ field: e.path, message: e.message }))
        });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        const field = err.errors[0]?.path;
        const message = field === 'email'
            ? 'El email ya está registrado'
            : 'Ya existe un registro con esos datos';
        return res.status(409).json({ error: message });
    }
    return res.status(500).json({ error: 'Algo salió mal, intentá de nuevo más tarde' });
};

module.exports = { notFound, errorHandler };