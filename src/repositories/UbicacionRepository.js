const Ubicacion = require('../models/Ubicacion');
const BaseRepository = require('../repositories/BaseRepository');
const Horario = require('../models/Horario');
const Sector = require('../models/Sector');
const UbicacionDTO = require('../dto/UbicacionDTO');
const Repofunciones  = require('../extras/UbicacionExtrasRepo');

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


    async createUbicacion(ubicacion) {
        try{
            let ubicacionDTO = new UbicacionDTO(ubicacion);
            const newUbicacion = await this.model.create(ubicacionDTO.toJSON());
            return newUbicacion;
        }catch(error){
            throw error;
        }
    }

    async updateUbicacion(id, newUbicacion) {
        try{
            let ubicacionActual = await Ubicacion.findByPk(id, {
                include: [Sector],
            });

            if(Repofunciones._permiteEditar(ubicacionActual, newUbicacion)){
                let diferenciaCapacidad = newUbicacion.cantidad_de_personas - ubicacionActual.cantidad_de_personas;
                let capacidadActual = ubicacionActual.capacidad_disponible;
                let capacidadNueva = capacidadActual + diferenciaCapacidad;
                let ubicacionDTO = new UbicacionDTO(newUbicacion);
                ubicacionDTO._capacidad_disponible = capacidadNueva;    
                return Ubicacion.update(ubicacionDTO.toJSON(), {
                    where: { idubicacion: id }
                });
            }else{
                throw { status: 400, message: "No se puede reducir la capacidad de la ubicacion, hay sectores asignados, edite o elimine algun sector para continuar" };
            }
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