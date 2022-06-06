const UbicacionRepository = require('../repositories/UbicacionRepository');
const BaseServices = require('../services/BaseServices');


class UbicacionServices extends BaseServices {
    constructor() {
        super(new UbicacionRepository());
        this._ubicacionRepository = new UbicacionRepository();
    }

    async getAllUbicaciones() {
        try {
            const ubicaciones = await this._ubicacionRepository.getAllUbicaciones();
            return ubicaciones;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUbicacionById(id) {
        try {
            const ubicacion = await this._ubicacionRepository.getUbicacionById(id);
            return ubicacion;
        } catch (error) {
            throw error;
        }
    }

    async createUbicacion(ubicacion) {
        try {
            const newUbicacion = await this._ubicacionRepository.createUbicacion(ubicacion);
            console.log(newUbicacion);
            return newUbicacion;
        } catch (error) {
            throw error;
        }
    }

    async updateUbicacion(id, ubicacion) {
        try {
            const updatedUbicacion = await this._ubicacionRepository.updateUbicacion(id, ubicacion);
            return updatedUbicacion;
        } catch (error) {
            throw error;
        }
    }

    deleteUbicacion(id) {
        try {
            const deletedUbicacion = this._ubicacionRepository.deleteUbicacion(id);
            return deletedUbicacion;
        } catch (error) {
            throw error;
        }
    }

    //Servicios para el lado del cliente final
    async getEntradasDisponibles(idhorario, idubicacion) {
        try {
            if (isNaN(idhorario) || isNaN(idubicacion)) throw { status: 400, message: 'idhorario y idubicacion deben ser numeros' };
            const cantidad_vendidas = await this._ubicacionRepository.getEntradasDisponibles(idhorario, idubicacion);
            const cantidad_personas = await this._ubicacionRepository.getCantidadDePersonas(idubicacion);
            const cantidad_disponible = cantidad_personas - cantidad_vendidas;
            return cantidad_disponible;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UbicacionServices;