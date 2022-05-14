const SectorServices = require('../../services/SectorServices');
const sectorServices = new SectorServices();

async function getAllSectores(req, res) {
    try{
        const sectors = await sectorServices.getAllSectores();
        res.status(200).json(sectors);
    }catch(error){
        res.status(500).json(error);
    }
}

async function getSectorById(req, res) {
    try{
        const sector = await sectorServices.getSectorById(req.params.id);
        res.status(200).json(sector);
    }catch(error){
        res.status(500).json(error);
    }
}

async function createSector(req, res) {
    try{
        const sector = await sectorServices.createSector(req.body);
        res.status(201).json(sector);
    }catch(error){
        res.status(error.status).json(error.message);
    }
}

async function updateSector(req, res) {
    try{
        const sector = await sectorServices.updateSector(req.params.id, req.body);
        res.status(200).json(sector);
    }catch(error){
        console.log(error);
        res.status(error.status||500).json(error.message||error);
    }
}

async function deleteSector(req, res) {
    try{
        const sector = await sectorServices.deleteSector(req.params.id);
        res.status(200).json(sector);
    }catch(error){
        res.status(error.status||500).json(error.message||error);
    }
}

module.exports = {
    getAllSectores,
    getSectorById,
    createSector,
    updateSector,
    deleteSector
}
