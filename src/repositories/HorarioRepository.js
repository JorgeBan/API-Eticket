const Horario = require('../models/Horario');
const Ubicacion = require('../models/Ubicacion');
const BaseRepository = require('./BaseRepository');
const { Op } = require('sequelize');
class HorarioRepository extends BaseRepository {
    constructor() {
        super(Horario);
    }

    async updateHorario(id, horario) {
        try {
            const updatedHorario = await this.model.update(horario, {
                where: { idhorario: id }
            });
            return updatedHorario;
        } catch (error) {
            throw error;
        }
    }
    async deleteHorario(id) {
        try {
            const deletedHorario = await this.model.destroy({
                where: { idhorario: id }
            });
            return deletedHorario;
        } catch (error) {
            throw { status: 403, message: 'NO puedes eliminar hay entradas vendidas' };
        }
    }

    //Repositorio para el manejo de los eventos del lado del cliente final
    async getHorariosByCategoria(idubicacion) {
        try {
            const horarios = await this.model.findAll({
                where: {
                    idubicacion: idubicacion,
                    fecha_hora: {
                        [Op.gt]: new Date()
                    }
                },
            });
            return horarios;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getHorarioByUbicacion(idhorario, idubicacion) {
        try {
            const horario = await this.model.findOne({
                where: {
                    [Op.and]: [
                        { idhorario: idhorario },
                        { idubicacion: idubicacion }
                    ]
                }
            });
            return horario;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = HorarioRepository;