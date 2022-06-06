const SectorRepository = require('../repositories/SectorRepository');
const BaseServices = require('../services/BaseServices');
const SectorDTO = require('../dto/sector/SectorDTO');
class SectorServices extends BaseServices {
    constructor() {
        super(new SectorRepository());
        this._sectorRepository = new SectorRepository();
    }

    async getAllSectores() {
        try {
            const sectores = await this._sectorRepository.getAllSectores();
            return sectores;
        } catch (error) {
            throw error;
        }
    }

    async getSectorById(id) {
        try {
            const sector = await this._sectorRepository.getSectorById(id);
            return sector;
        } catch (error) {
            throw error;
        }
    }

    async createSector(sector) {
        try {
            const createdSector = await this._sectorRepository.createSector(sector);
            return createdSector;
        } catch (error) {
            throw error;
        }
    }

    async updateSector(id, sector) {
        try {
            const updatedSector = await this._sectorRepository.updateSector(id, sector);
            return updatedSector;
        } catch (error) {
            throw error;
        }
    }

    async deleteSector(id) {
        try {
            const deletedSector = await this._sectorRepository.deleteSector(id);
            return deletedSector;
        } catch (error) {
            throw error;
        }
    }
    //Servicios para el manejo de los sectores del lado del cliente final
    async getSectoresByUbicacion(idubicacion) {
        try {
            //verificar que el idubiocacion es un numero
            if (isNaN(idubicacion)) throw { status: 400, message: 'El id de la ubicacion debe ser un numero' };
            let listSectores = [];
            const sectores = await this._sectorRepository.getSectoresByUbicacion(idubicacion);
            for (let i = 0; i < sectores.length; i++) {
                const sector = new SectorDTO(sectores[i].dataValues);
                listSectores.push(sector.toJSON());
            }
            return listSectores;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getEntradasDisponibles(idhorario, idsector) {
        try {
            if (isNaN(idhorario) || isNaN(idsector)) throw { status: 400, message: 'idhorario y idsector deben ser numeros' };
            const cantidad_vendidas = await this._sectorRepository.getEntradasDisponibles(idhorario, idsector);
            const cantidad_personas = await this._sectorRepository.getCantidadDePersonas(idsector);
            const cantidad_disponible = cantidad_personas - cantidad_vendidas;
            return cantidad_disponible;
        } catch (error) {
            console.log(error);
            throw error;
        }


    }
}

module.exports = SectorServices;
