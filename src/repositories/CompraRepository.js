const BaseRepository = require('./BaseRepository');
const Nota_venta = require('../models/Nota_venta');
const Ticket = require('../models/Ticket');
const Detalle_venta = require('../models/Detalle_venta');
const Tipo_pago = require('../models/Tipo_pago');
const Datos_cliente = require('../models/Datos_cliente');
const Espacio_reservado = require('../models/Espacio_reservado');
const Ubicacion_repository = require('../repositories/UbicacionRepository');
const _ubicacion_repository = new Ubicacion_repository();

const Sector_repository = require('../repositories/SectorRepository');
const _sector_repository = new Sector_repository();


class CompraRepository extends BaseRepository {
    constructor() {
        super(Nota_venta);
    }

    async entradasDisponiblesUbica(idhorario, idubicacion) {
        try {
            const entradas_vendidas = await _ubicacion_repository.getEntradasDisponibles(idhorario, idubicacion);
            const total_entradas = await _ubicacion_repository.getCantidadDePersonas(idubicacion);
            return total_entradas - entradas_vendidas;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async entradasDisponiblesSector(idhorario, idsector) {
        try {
            const sector = await _sector_repository.getSectorById(idsector);
            if (!sector) throw { status: 404, message: 'Sector no encontrado' };
            const entradas_vendidas = await _sector_repository.getEntradasDisponibles(idhorario, idsector);
            const total_entradas = await _sector_repository.getCantidadDePersonas(idsector);
            return {
                nombre: sector.nombre,
                entradas_disponibles: total_entradas - entradas_vendidas,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async verificarEspacio(idhorario, idespacio) {
        try {
            const espacio = await _ubicacion_repository.getEspacioById(idespacio);
            if (!espacio) throw { status: 404, message: 'Espacio no encontrado' };
            const espacioReservado = Espacio_reservado.findOne({
                where: {
                    idespacio,
                    idhorario,
                },
            });
            if (espacioReservado) {
                return {
                    identificador: espacio.identificador,
                    disponible: false
                };
            }
            return {
                identificador: espacio.identificador,
                disponible: true
            };

        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

module.exports = CompraRepository;