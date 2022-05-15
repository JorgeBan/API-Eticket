const ImagenEventoService = require('../../services/ImagenEventoServices');
const imagenEventoService = new ImagenEventoService();

async function getAllImagenesEventos(req, res) {

    try {
        const imagenesEventos = await imagenEventoService.getAll();
        res.status(200).json(imagenesEventos);
    }catch(err) {
        res.status(err.status||500).json(err);
    }
}

async function getImagenEventoById(req, res) {    
        try {
            const imagenEvento = await imagenEventoService.getById(req.params.id);
            res.status(200).json(imagenEvento);
        }catch(err) {
            res.status(err.status||500).json(err); 
        }
}

async function createImagenEvento(req, res) {
    try {
        const imagenEvento = await imagenEventoService.createImagenEvento(req.body, req.files);
        res.status(201).json(imagenEvento);
    }catch(err) {
        res.status(err.status||500).json(err);
    }
}

async function deleteImagenEvento(req, res) {
    try {
        const imagenEvento = await imagenEventoService.deleteImagenEvento(req.params.id);
        res.status(200).json(imagenEvento);
    }catch(err) {
        res.status(err.status||500).json(err);
    }
}

module.exports = {
    getAllImagenesEventos,
    getImagenEventoById,
    createImagenEvento,
    deleteImagenEvento
}