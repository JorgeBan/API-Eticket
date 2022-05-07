const EspacioRepository = require('../repositories/EspacioRepository');
const BaseServices = require('../services/BaseServices');

class EspacioServices extends BaseServices {
    constructor() {
        super(new EspacioRepository());
        this._espacioRepository = new EspacioRepository();
    }

    async getAllEspacios(){
        try {
            const espacios = await this._espacioRepository.getAll();
            return espacios;
        } catch (e) {
            throw e;
        }
    }

    async getEspacioById(id){
        try {
            const espacio = await this._espacioRepository.getById(id);
            return espacio;
        } catch (e) {
            throw e;
        }
    }

    async createEspacio(espacio){
        try {
            const newEspacio = await this._espacioRepository.create(espacio);
            return newEspacio;
        } catch (e) {
            throw e;
        }
    }

    async updateEspacio(id, espacio){
        try {
            const updatedEspacio = await this._espacioRepository.updateEspacio(id, espacio);
            return updatedEspacio;
        } catch (e) {
            throw e;
        }
    }

    async deleteEspacio(id){
        try {
            const espacio = await this._espacioRepository.deleteEspacio(id);
            return espacio;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = EspacioServices;