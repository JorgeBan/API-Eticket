const SectorRepository = require('../repositories/SectorRepository');
const BaseServices = require('../services/BaseServices');

class SectorServices extends BaseServices {
    constructor() {
        super(new SectorRepository());
        this._sectorRepository = new SectorRepository();
    }

    async getAllSectores() {
        try{
            const sectores = await this._sectorRepository.getAllSectores();
            return sectores;
        }catch(error){
            throw error;
        }
    }

    async getSectorById(id) {
        try{
            const sector = await this._sectorRepository.getSectorById(id);
            return sector;
        }catch(error){
            throw error;
        }
    }

    async createSector(sector) {
        try{
            const createdSector = await this._sectorRepository.createSector(sector);
            return createdSector;
        }catch(error){
            throw error;
        }
    }

    async updateSector(id, sector) {
        try{
            const updatedSector = await this._sectorRepository.updateSector(id, sector);
            return updatedSector;
        }catch(error){
            throw error;
        }
    }

    async deleteSector(id) {
        try{
            const deletedSector = await this._sectorRepository.deleteSector(id);
            return deletedSector;
        }catch(error){
            throw error;
        }
    }
}

module.exports = SectorServices;
