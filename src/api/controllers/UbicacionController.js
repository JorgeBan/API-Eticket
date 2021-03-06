const UbicacionServices = require('../../services/UbicacionServices');
const ubicacionServices = new UbicacionServices();

async function getAllUbicaciones(req, res) {
    try {
        const ubicaciones = await ubicacionServices.getAllUbicaciones();
        res.status(200).json(ubicaciones);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function getUbicacionById(req, res) {
    try {
        const ubicacion = await ubicacionServices.getUbicacionById(req.params.id);
        res.status(200).json(ubicacion);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function createUbicacion(req, res) {
    try {
        console.log(req.body);
        const ubicacion = await ubicacionServices.createUbicacion(req.body);
        res.status(201).json(ubicacion);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function updateUbicacion(req, res) {
    try {
        const ubicacion = await ubicacionServices.updateUbicacion(req.params.id, req.body);
        res.status(200).json(ubicacion);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function deleteUbicacion(req, res) {
    try {
        const ubicacion = await ubicacionServices.deleteUbicacion(req.params.id);
        res.status(200).json(ubicacion);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}
//funciones para el lado del cliente final
async function getEntradasDisponibles(req, res) {
    try {
        const ubicaciones = await ubicacionServices.getEntradasDisponibles(req.query.idhorario, req.query.idubicacion);
        res.status(200).json(ubicaciones);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}
module.exports = {
    getAllUbicaciones,
    getUbicacionById,
    createUbicacion,
    updateUbicacion,
    deleteUbicacion,
    getEntradasDisponibles
}