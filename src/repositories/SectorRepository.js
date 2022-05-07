const Sector = require('../models/Sector');
const Espacio = require('../models/Espacio');
const BaseRepository = require('../repositories/BaseRepository');

class SectorRepository extends BaseRepository {
    constructor() {
        super(Sector);
    }

    async getAllSectores() {
        try {
            const sectores = await this.model.findAll({
                include: [Espacio]
            });
            return sectores;
        } catch (e) {
            throw e;
        }
    }

    async getSectorById(id) {
        try {
            const sector = await this.model.findByPk(id, {
                include: [Espacio]
            });
            return sector;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async updateSector(id, sector) {
        try {
            const updatedSector = await this.model.update(sector, {
                where: { idsector: id }
            });
            return updatedSector;
        } catch (e) {
            throw e;
        }
    }

    async deleteSector(id) {
        try {
            const deletedSector = await this.model.destroy({
                where: { idsector: id }
            });
            return deletedSector;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = SectorRepository;