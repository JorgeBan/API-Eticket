const Imagenes_evento = require('../models/Imagenes_evento');
const BaseRepository = require('../repositories/BaseRepository');
const cloudinary = require('../config/images/cloudinary');
const fs = require('fs');

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
                urls.push({
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
            const urls = await this.storageImagenes(imagenes);
            const imagenesList = [];
            for (const url of urls) {
                let imagen = {
                    nombre: url.filename,
                    url: url.url,
                    idevento: info.idevento
                }
                let images = await this.model.create(imagen);
                imagenesList.push(images);
            }
            return imagenesList;
        }catch(error) {
            throw error;
        }
    }
}

module.exports = ImagenesEventoRepository;