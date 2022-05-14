const EspacioSevice = require('../../services/EspacioServices');
const espacioService = new EspacioSevice();

async function getAllEspacios(req, res) {
    try {
        const espacios = await espacioService.getAllEspacios();
        res.json(espacios);
    } catch (e) {
        res.status(500).json(e);
    }
}

async function getEspacioById(req, res) {
    try {
        const espacio = await espacioService.getEspacioById(req.params.id);
        res.json(espacio);
    } catch (e) {
        res.status(500).json(e);
    }
}

async function createEspacio(req, res) {
    try {
        const espacio = await espacioService.create(req.body);
        res.json(espacio);
    } catch (e) {
        res.status(500).json(e);
    }
}

async function updateEspacio(req, res) {
    try {
        const espacio = await espacioService.updateEspacio(req.params.id, req.body);
        res.json(espacio);
    } catch (e) {
        res.status(500).json(e);
    }
}

async function deleteEspacio(req, res) {
    try {
        const espacio = await espacioService.deleteEspacio(req.params.id);
        res.json(espacio);
    }catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

async function createAllEspacios(req, res) {
    try {
        const espacio = await espacioService.createAllEspacios(req.params.cantidad, req.body);
        res.json(espacio);
    }catch (e) {
        console.log(e);
        res.status(e.status||500).json(e);
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