const Ubicacion = require('../models/Ubicacion');
const BaseRepository = require('../repositories/BaseRepository');
const Horario = require('../models/Horario');
const Sector = require('../models/Sector');

class UbicacionRepository extends BaseRepository {
    constructor() {
        super(Ubicacion);
    }

    async getAllUbicaciones() {
        try{
            const ubicaciones = await this.model.findAll({
                include: [Horario, Sector]
            });
            return ubicaciones;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getUbicacionById(id) {
        try{
            const ubicacion = await this.model.findByPk(id, {
                include: [Horario, Sector]
            });
            return ubicacion;
        }catch(error){
            throw error;
        }
    }

    async updateUbicacion(id, ubicacion) {
        try{
            const updatedUbicacion = await this.model.update(ubicacion, {
                where: { idubicacion: id }
            });
            return updatedUbicacion;
        }catch(error){
            throw error;
        }
    }

    async deleteUbicacion(id) {
        try{
            const deletedUbicacion = await this.model.destroy({
                where: { idubicacion: id }
            });
            return deletedUbicacion;
        }catch(error){
            throw error;
        }
    }
}

module.exports = UbicacionRepository;