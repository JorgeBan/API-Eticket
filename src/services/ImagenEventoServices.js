const ImagenEventoRepository = require('../repositories/ImagenEventoRepository');
const BaseService = require('../services/BaseServices');

class ImagenEventoService extends BaseService {
    constructor() {
        super( new ImagenEventoRepository());
        this._imagenEventoRepository = new ImagenEventoRepository();
    }

    async createImagenEvento(info, imagenes) {
        try{
            const imagenEvento = await this._imagenEventoRepository.createImagenEvento(info, imagenes);
            return imagenEvento;
        }catch(error){
            throw error;
        }
    }

    async deleteImagenEvento(id) {
        try{
            const imagenEvento = await this._imagenEventoRepository.deleteImagenEvento(id);
            return imagenEvento;
        }catch(error){
            throw error;
        }
    }
}

module.exports = ImagenEventoService;