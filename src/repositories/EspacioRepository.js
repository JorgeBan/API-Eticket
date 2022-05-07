const Espacio = require('../models/Espacio');
const BaseRepository = require('../repositories/BaseRepository');

class EspacioRepository extends BaseRepository {
    constructor() {
        super(Espacio);
    }

    async updateEspacio(id, espacio) {
        try {
            const updatedEspacio = await this.model.update(espacio, {
                where: { idespacio: id }
            });
            return updatedEspacio;
        } catch (e) {
            throw e;
        }

    }

    async deleteEspacio(id) {
        try {
            const deletedEspacio = await this.model.destroy({
                where: { idespacio: id }
            });
            return deletedEspacio;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = EspacioRepository;
