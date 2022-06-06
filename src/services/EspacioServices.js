const espaciosDiponibleDTO = require('../dto/espacio/EspacioDisponibleDTO');
const EspacioRepository = require('../repositories/EspacioRepository');
const BaseServices = require('../services/BaseServices');

class EspacioServices extends BaseServices {
    constructor() {
        super(new EspacioRepository());
        this._espacioRepository = new EspacioRepository();
    }

    async getAllEspacios() {
        try {
            const espacios = await this._espacioRepository.getAll();
            return espacios;
        } catch (e) {
            throw e;
        }
    }

    async getEspacioById(id) {
        try {
            const espacio = await this._espacioRepository.getById(id);
            return espacio;
        } catch (e) {
            throw e;
        }
    }

    async createEspacio(espacio) {
        try {
            const newEspacio = await this._espacioRepository.create(espacio);
            return newEspacio;
        } catch (e) {
            throw e;
        }
    }

    async updateEspacio(id, espacio) {
        try {
            const updatedEspacio = await this._espacioRepository.updateEspacio(id, espacio);
            return updatedEspacio;
        } catch (e) {
            throw e;
        }
    }

    async deleteEspacio(id) {
        try {
            const espacio = await this._espacioRepository.deleteEspacio(id);
            return espacio;
        } catch (e) {
            throw e;
        }
    }

    async createAllEspacios(cantidad, espacio) {
        try {
            const espacios = this._espacioRepository.createAllEspacios(cantidad, espacio);
            return espacios;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    //servicios para el manejo de los espacios reservados
    async getAllEspaciosLibres(idsector, idhorario) {
        try {
            if (isNaN(idsector) || isNaN(idhorario)) throw { status: 400, message: 'idsector y idhorario deben ser numeros' };
            let espacios_libres = [];
            const espacios = await this._espacioRepository.getAllEspaciosReservados(idsector, idhorario);
            for (let i = 0; i < espacios.length; i++) {
                if (espacios[i].espacio_reservados.length == 0) {
                    let espaciosDiponible = new espaciosDiponibleDTO(espacios[i])
                    espacios_libres.push(espaciosDiponible);
                }
            }
            return espacios_libres;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = EspacioServices;