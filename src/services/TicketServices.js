const TicketRepository = require('../repositories/TicketRepository');
const HorarioRepository = require('../repositories/HorarioRepository');
const UbicacionRepository = require('../repositories/UbicacionRepository');
const SectorRepository = require('../repositories/SectorRepository');
const EspacioRepository = require('../repositories/EspacioRepository');
const EventoRepository = require('../repositories/EventoRepository');
var CryptoJS = require("crypto-js");
const Ticket = require('../models/Ticket');
//const BaseServices = require('../services/BaseServices');
const TicketDTO = require('../dto/ticket/InfoTicketDTO');
const RegistroDTO = require('../dto/ticket/registroTicketDTO');

class TicketServices {
    constructor() {
        this._ticketRepository = new TicketRepository();
    }

    async infoTickets(codeTickets, idubicacion, idhorario) {
        try {
            let info = this.desencryptarTickets(codeTickets);
            //obtener datos del ticket
            let ticket = await this._ticketRepository.getInfoTicket(info.idticket, info.idusuario);


            if (ticket.idubicacion !== idubicacion || ticket.idhorario !== idhorario)
                throw { status: 400, message: 'El ticket no corresponde al evento seleccionado' };


            //obtener horario, ubicacion, sector, espacio
            let _ubicacionRepository = new UbicacionRepository();
            let _horarioRepository = new HorarioRepository();
            let _sectorRepository = new SectorRepository();
            let _espacioRepository = new EspacioRepository();
            let _eventoRepository = new EventoRepository();

            let ubicacion = await _ubicacionRepository.getById(ticket.idubicacion);
            let evento = await _eventoRepository.getById(ubicacion.idevento);
            let horario = await _horarioRepository.getById(ticket.idhorario);
            let { fecha, hora } = this._obtenerFechaHora(horario);
            let { sector, espacio } = await this._obtenerSectorYEspacio(ticket, _sectorRepository, _espacioRepository);
            let usuario = ticket.user.dataValues;

            let ticketDto = new TicketDTO(
                ticket.idticket,
                evento.nombre,
                fecha,
                hora,
                ubicacion.nombre,
                sector,
                espacio,
                usuario,
                ticket.estado
            );

            return ticketDto.toJSON();

        } catch (e) {
            console.error(e);
            if (!e.status)
                throw { status: 400, message: 'Ticket invalido' }
            else
                throw e;
        }
    }

    async registrarTicket(idticket, idubicacion, idhorario, idusuario) {
        try {
            let ticket = await this._ticketRepository.getById(idticket);
            let response = { msg: 'El ticket ya ha sido utilizado' };

            if (ticket.idubicacion !== idubicacion || ticket.idhorario !== idhorario)
                throw { status: 400, message: 'El ticket no corresponde al evento seleccionado' };
            if (ticket.estado === 'disponible') {
                let registroDTO = new RegistroDTO(idticket, idusuario, idubicacion, idhorario);
                await this._ticketRepository.registrarTicket(registroDTO);
                response.msg = 'ticket registrado';
            }

            return response;
        } catch (e) {
            throw e;
        }
    }
    async _obtenerSectorYEspacio(ticket, _sectorRepository, _espacioRepository) {
        let sector = 'N/A';
        let espacio = 'N/A';

        if (ticket.idsector) {
            sector = await _sectorRepository.getById(ticket.idsector);
            sector = sector.nombre;
            if (ticket.idespacio) {
                espacio = await _espacioRepository.getById(ticket.idespacio);
                espacio = espacio.identificador;
            }
        }
        return { sector, espacio };
    }

    _obtenerFechaHora(horario) {
        let date = new Date(horario.dataValues.fecha_hora);
        let minutos = date.getMinutes() + '';
        if (minutos.length === 1)
            minutos = minutos + '0';
        let hora = date.getHours() + ':' + minutos;
        let fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return { fecha, hora };
    }

    desencryptarTickets(ticket) {
        try {
            let ticketDesncriptado = CryptoJS.AES.decrypt(ticket, process.env.AES_KEY).toString(CryptoJS.enc.Utf8);
            return JSON.parse(ticketDesncriptado);
        } catch (e) {
            throw e;
        }
    }

}

module.exports = TicketServices;