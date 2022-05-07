const UbicacionServices = require('../../services/UbicacionServices');
const ubicacionServices = new UbicacionServices();

async function getAllUbicaciones(req, res) {
    try{
        const ubicaciones = await ubicacionServices.getAllUbicaciones();
        res.status(200).json(ubicaciones);
    }catch(error){
        res.status(500).json(error);
    }
}

async function getUbicacionById(req, res) {
    try{
        const ubicacion = await ubicacionServices.getUbicacionById(req.params.id);
        res.status(200).json(ubicacion);
    }catch(error){
        res.status(500).json(error);
    }
}

async function createUbicacion(req, res) {
    try{
        const ubicacion = await ubicacionServices.create(req.body);
        res.status(201).json(ubicacion);
    }catch(error){
        res.status(500).json(error);
    }
}

async function updateUbicacion(req, res) {
    try{
        const ubicacion = await ubicacionServices.updateUbicacion(req.params.id, req.body);
        res.status(200).json(ubicacion);
    }catch(error){
        res.status(500).json(error);
    }
}

async function deleteUbicacion(req, res) {
    try{
        const ubicacion = await ubicacionServices.deleteUbicacion(req.params.id);
        res.status(200).json(ubicacion);
    }catch(error){
        res.status(500).json(error);
    }
}

module.exports = {
    getAllUbicaciones,
    getUbicacionById,
    createUbicacion,
    updateUbicacion,
    deleteUbicacion 
}