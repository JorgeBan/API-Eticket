const HorarioRepository = require('../repositories/HorarioRepository');
const BaseServices = require('../services/BaseServices');

class HorarioServices extends BaseServices {   
    constructor() {
        super(new HorarioRepository());
        this._horarioRepository = new HorarioRepository();
    }

    async updateHorario(id, horario) {
        try{
            const updatedHorario = await this._horarioRepository.updateHorario(id, horario);
            return updatedHorario;
        }catch(error){
            throw error;
        }
    }

    deleteHorario(id) {
        try{
            const deletedHorario = this._horarioRepository.deleteHorario(id);
            return deletedHorario;
        }catch(error){
            throw error;
        }
    }
}

module.exports = HorarioServices;

