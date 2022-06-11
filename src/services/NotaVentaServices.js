const NotaVentaRepository = require('../repositories/NotaVentaRepository');
const BaseServices = require('../services/BaseServices');
const NotaVentaDTO = require('../dto/nota_venta/NotaVentaDTO');
const DetalleVentaDTO = require('../dto/nota_venta/DetalleVentaDTO');
const NotaDetalleDTO = require('../dto/nota_venta/NotaDetalleDTO');
const EventoRepository = require('../repositories/EventoRepository');
const TipoPagoRepository = require('../repositories/TipoPagoRepository');

const eventoRepository = new EventoRepository();
const tipoPagoRepository = new TipoPagoRepository();
class NotaVentaServices extends BaseServices {
    constructor() {
        super(new NotaVentaRepository());
        this._notaVentaRepository = new NotaVentaRepository();
    }

    async getAllNotasVenta(iduser) {
        try {
            let notasVenta = await this._notaVentaRepository.getAllNotasVenta(iduser);
            if (!notasVenta) throw { status: 404, message: 'No se encontraron las notas de venta' };
            let notasDTO = [];
            for (let nota of notasVenta) {
                let evento = await eventoRepository.getEventoById(nota.idevento);
                let tipoPago = await tipoPagoRepository.getTipoPago(nota.idpago);
                let notaDTO = new NotaVentaDTO(nota.dataValues, evento.dataValues.nombre, tipoPago.dataValues.nombre);
                notasDTO.push(notaDTO.toJson());
            }
            return notasDTO;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getNotaVentaDetalle(iduser, nroNota) {
        try {
            let notaVenta = await this._notaVentaRepository.getNotaVentaDetalle(iduser, nroNota);
            if (!notaVenta) throw { status: 404, message: 'No se encontró la nota de venta' };
            let evento = await eventoRepository.getEventoById(notaVenta.idevento);
            let tipoPago = await tipoPagoRepository.getTipoPago(notaVenta.idpago);
            let detalles = [];
            for (let detalle of notaVenta.detalle_venta) {
                let detalleDTO = new DetalleVentaDTO(detalle.dataValues);
                detalles.push(detalleDTO.toJson());
            }

            let notaDetalleDTO = new NotaDetalleDTO(notaVenta.dataValues, evento.dataValues.nombre, tipoPago.dataValues.nombre, detalles);
            return notaDetalleDTO.toJson();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = NotaVentaServices;