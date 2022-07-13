const BaseRepository = require('../repositories/BaseRepository');
const RegistroTicket = require('../models/Registro_ticket');
const Ticket = require('../models/Ticket');
const Horario = require('../models/Horario');
class ReporteRepository extends BaseRepository {
    constructor() {
        super(RegistroTicket);
        this._ticket = Ticket;
        this._horario = Horario;
    }

    async getTicketsByHorario(idubicacion, idhorario) {
        try {
            let tickets = await this._ticket.findAll({
                where: {
                    idubicacion: idubicacion,
                    idhorario: idhorario
                }
            })
            return tickets;
        } catch (e) {
            throw new e;
        }
    }

    async getHorariosByUbicacion(idubicacion) {
        try {
            let horarios = await this._horario.findAll({
                where: {
                    idubicacion: idubicacion
                }
            });
            return horarios;
        } catch (e) {
            throw e;
        }
    }
}
module.exports = ReporteRepository;