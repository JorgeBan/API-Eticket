const Horario = require('../models/Horario');
const Ubicacion = require('../models/Ubicacion');
const BaseRepository = require('./BaseRepository');

class HorarioRepository extends BaseRepository {
    constructor() {
        super(Horario);
    }

    async updateHorario(id, horario) {
        try{
            const updatedHorario = await this.model.update(horario, {    
                where: { idhorario: id } 
            });
            return updatedHorario;
        }catch(error){
            throw error;
        }
    }
    async deleteHorario(id) {
        try{
            const deletedHorario = await this.model.destroy({
                where: { idhorario: id }
            });
            return deletedHorario;
        }catch(error){
            throw error;
        }
    }
}

module.exports = HorarioRepository;