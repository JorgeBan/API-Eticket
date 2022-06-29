const Ticket = require('../models/Ticket');
const User = require('../models/User');
const BaseRepository = require('../repositories/BaseRepository');
class TicketRepository extends BaseRepository {
    constructor() {
        super(Ticket);
    }

    async getInfoTicket(idTicket, idUser) {
        let user = await Ticket.findByPk(idTicket, {
            include: [User],
            where: {
                idusuario: idUser
            }
        });
        return user.dataValues;
    }
}

module.exports = TicketRepository;