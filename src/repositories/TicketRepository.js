const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Registro_ticket = require('../models/Registro_ticket');
const BaseRepository = require('../repositories/BaseRepository');
const sequelize = require('../config/database/database');

class TicketRepository extends BaseRepository {
    constructor() {
        super(Ticket);
    }

    async getInfoTicket(idTicket, idUser) {
        try {
            let user = await Ticket.findByPk(idTicket, {
                include: [User],
                where: {
                    idusuario: idUser
                }
            });
            return user.dataValues;
        } catch (err) {
            throw err;
        }
    }

    async registrarTicket(ticketRegistro) {
        try {
            const t = await sequelize.transaction();
            let registro = await Registro_ticket.create(ticketRegistro,
                { transaction: t }
            );
            let ticket = await this.model.findByPk(ticketRegistro.idticket,
                { transaction: t });

            await ticket.update({ estado: 'registrado' },
                { transaction: t }
            );

            await ticket.save({ transaction: t });
            await t.commit();
            return registro;
        } catch (err) {
            console.error(err);
            await t.rollback();
            throw err;
        }
    }
}

module.exports = TicketRepository;