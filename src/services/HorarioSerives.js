const HorarioRepository = require('../repositories/HorarioRepository');
const BaseServices = require('../services/BaseServices');
class HorarioServices extends BaseServices {
    constructor() {
        super(new HorarioRepository());
        this._horarioRepository = new HorarioRepository();
    }

    async updateHorario(id, horario) {
        try {
            const updatedHorario = await this._horarioRepository.updateHorario(id, horario);
            return updatedHorario;
        } catch (error) {
            throw error;
        }
    }

    deleteHorario(id) {
        try {
            const deletedHorario = this._horarioRepository.deleteHorario(id);
            return deletedHorario;
        } catch (error) {
            throw error;
        }
    }

    //Servicios para el manejo de los eventos del lado del cliente final
    async getHorariosByCategoria(idubicacion) {
        try {
            if (isNaN(idubicacion)) throw { status: 400, message: 'Se requiere del id de la ubicación que debe ser un número' };
            const horarios = await this._horarioRepository.getHorariosByCategoria(idubicacion);
            console.log("horarios: ", horarios);
            return horarios;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = HorarioServices;

