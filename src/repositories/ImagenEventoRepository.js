const Imagenes_evento = require('../models/Imagenes_evento');
const BaseRepository = require('../repositories/BaseRepository');
const cloudinary = require('../config/images/cloudinary');
const fs = require('fs');
const EventoRepository = require('../repositories/EventoRepository');
class ImagenesEventoRepository extends BaseRepository {
    constructor() {
        super(Imagenes_evento);
    }

    async storageImagenes(imagenesEvento) {
        try {
            const uploader = async (path) => await cloudinary.uploads(path, 'Images');
            const urls = [];
            const files = imagenesEvento;
            for (const file of files) {
                const { path } = file;
                const { filename } = file
                const newPath = await uploader(path);
                console.log(newPath);
                urls.push({
                    idpublico: newPath.id,
                    url: newPath.url,
                    filename: filename
                });
                fs.unlinkSync(path);
            }
            return urls;
        }catch(error) {
            throw error;
        }
    }

    async createImagenEvento(info, imagenes) {
        try {
            const evento = new EventoRepository();
            const idevento = await evento.getById(info.idevento);
            console.log("AQUI ESTA EL ID: "+idevento);
            const imagenesList = [];
            if(idevento){
                const urls = await this.storageImagenes(imagenes);
                for (const url of urls) {
                    let imagen = {
                        nombre: url.filename,
                        url: url.url,
                        idpublico: url.idpublico, 
                        idevento: info.idevento
                }
                    let images = await this.model.create(imagen);
                    imagenesList.push(images);
            }
            }
            return imagenesList;
        }catch(error) {
            throw error;
        }
    }

    async deleteImagenEvento(id) {
        try {
            const imagen = await this.model.findByPk(id);
            let imagenDeleted = 0;
            if(imagen){
                const idpublico = imagen.idpublico;
                cloudinary.delete(idpublico, 'Images');
                    imagenDeleted = await this.model.destroy({
                        where: {
                            idpublico: idpublico}
                        });    
            }
            return imagenDeleted;
        }catch(error) {
            throw error;
        }

    }
}

module.exports = ImagenesEventoRepository;