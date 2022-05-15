const EspacioSevice = require('../../services/EspacioServices');
const espacioService = new EspacioSevice();

async function getAllEspacios(req, res) {
    try {
        const espacios = await espacioService.getAllEspacios();
        res.status(200).json(espacios);
    } catch (err) {
        res.status(err.status||500).json(err);
    }
}

async function getEspacioById(req, res) {
    try {
        const espacio = await espacioService.getEspacioById(req.params.id);
        res.status(200).json(espacio);
    } catch (err) {
        res.status(err.status||500).json(err);
    }
}

async function createEspacio(req, res) {
    try {
        const espacio = await espacioService.create(req.body);
        res.status(201).json(espacio);
    } catch (err) {
        res.status(err.status||500).json(err);
    }
}

async function updateEspacio(req, res) {
    try {
        const espacio = await espacioService.updateEspacio(req.params.id, req.body);
        res.status(200).json(espacio);
    } catch (err) {
        res.status(err.status||500).json(err);
    }
}

async function deleteEspacio(req, res) {
    try {
        const espacio = await espacioService.deleteEspacio(req.params.id);
        res.status(200).json(espacio);
    }catch (err) {
        res.status(err.status||500).json(err);
    }
}

async function createAllEspacios(req, res) {
    try {
        const espacio = await espacioService.createAllEspacios(req.params.cantidad, req.body);
        res.status(201).json(espacio);
    }catch (err) {
        res.status(err.status||500).json(err);
    }
}

module.exports = {
    getAllEspacios,
    getEspacioById,
    createEspacio,
    updateEspacio,
    deleteEspacio,
    createAllEspacios
}