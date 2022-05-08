const ImagenEventoService = require('../../services/ImagenEventoServices');
const imagenEventoService = new ImagenEventoService();

async function getAllImagenesEventos(req, res) {

    try {
        const imagenesEventos = await imagenEventoService.getAll();
        res.status(200).json(imagenesEventos);
    }catch(error) {
        res.status(500).json(error);
        console.log(error);
    }
}

async function getImagenEventoById(req, res) {    
        try {
            const imagenEvento = await imagenEventoService.getById(req.params.id);
            res.status(200).json(imagenEvento);
        }catch(error) {
            res.status(500).json(error);
            console.log(error); 
        }
}

async function createImagenEvento(req, res) {
    try {
        const imagenEvento = await imagenEventoService.createImagenEvento(req.body, req.files);
        res.status(201).json(imagenEvento);
    }catch(error) {
        res.status(500).json(error);
        console.log(error);
    }
}

async function deleteImagenEvento(req, res) {
    try {
        const imagenEvento = await imagenEventoService.deleteImagenEvento(req.params.id);
        res.status(200).json(imagenEvento);
    }catch(error) {
        res.status(500).json(error);
        console.log(error);
    }
}

module.exports = {
    getAllImagenesEventos,
    getImagenEventoById,
    createImagenEvento,
    deleteImagenEvento
}