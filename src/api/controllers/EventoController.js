const EventoServices = require('../../services/EventoServices');

const eventoServices = new EventoServices();

    async function getAllEventoEncabezados(req, res) {
        try{
            const eventos = await eventoServices.getAllEventoEncabezados();
            res.status(200).json(eventos);
        }catch(e){
            res.status(500).json(e);
        }
    }

    async function getAllEventosDatos(req, res) {
        try{
            const eventos = await eventoServices.getAllEventosDatos();
            res.status(200).json(eventos);
        }catch(e){
            res.status(500).json(e);
        }
    }

    async function getEventoEncabezadosById(req, res) {
        try{
            const evento = await eventoServices.getEventoEncabezadosById(req.params.id);
            res.status(200).json(evento);
        }catch(e){ 
            res.status(500).json(e);
        }
    }

    async function getEventosDatosById(req, res) {
        try{
            const evento = await eventoServices.getEventosDatosById(req.params.id);
            res.status(200).json(evento);
        }catch(e){
            res.status(500).json(e);
        }
    }

    async function createEvento(req, res) {
        try{
            const evento = await eventoServices.create(req.body);
            res.status(201).json(evento);
        }catch(e){
            res.status(500).json(e);
        }
    }

    async function updateEvento(req, res) {
        try{
            const evento = await eventoServices.updateEvento(req.params.id, req.body);
            res.status(200).json(evento);
        }catch(e){
            res.status(500).json(e);
        }
    }

    async function deleteEvento(req, res) {
        try{
            const evento = await eventoServices.deleteEvento(req.params.id);
            res.status(200).json(evento);
        }catch(e){
            res.status(500).json(e);
        }
    }
module.exports = {
    getAllEventoEncabezados,
    getAllEventosDatos,
    getEventoEncabezadosById,
    getEventosDatosById,
    createEvento,
    updateEvento,
    deleteEvento
}