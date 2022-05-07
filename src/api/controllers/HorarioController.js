const HorarioServices = require('../../services/HorarioSerives');

const horarioServices = new HorarioServices();

async function getAllHorarios(req, res) {
    try{
        const horarios = await horarioServices.getAll();
        res.status(200).json(horarios);
    }catch(error){
        res.status(500).json(error);
    }
}


async function getHorarioById(req, res) {
    try{
        const horario = await horarioServices.getById(req.params.id);
        res.status(200).json(horario);
    }catch(error){
        res.status(500).json(error);
    }
}

async function createHorario(req, res) {
    try{
        const horario = await horarioServices.create(req.body);
        res.status(201).json(horario);
    }catch(error){
        res.status(500).json(error);
    }
}

async function updateHorario(req, res) {
    try{
        const horario = await horarioServices.updateHorario(req.params.id, req.body);
        res.status(200).json(horario);
    }catch(error){
        res.status(500).json(error);
    }
}

async function deleteHorario(req, res) {
    try{
        const horario = await horarioServices.deleteHorario(req.params.id);
        res.status(200).json(horario);
    }catch(error){
        res.status(500).json(error);
    }
}


module.exports = {
    getAllHorarios,
    getHorarioById,
    createHorario,
    updateHorario,
    deleteHorario 
}