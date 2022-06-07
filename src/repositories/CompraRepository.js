const BaseRepository = require('./BaseRepository');
const Nota_venta = require('../models/Nota_venta');
const Ticket = require('../models/Ticket');
const Detalle_venta = require('../models/Detalle_venta');
const Tipo_pago = require('../models/Tipo_pago');
const Datos_cliente = require('../models/Datos_cliente');

const Entradas_sector = require('../models/Entradas_sector');
const Entradas_ubicacion = require('../models/Entradas_ubicacion');
const Espacio_reservado = require('../models/Espacio_reservado');

const Ubicacion_repository = require('../repositories/UbicacionRepository');
const _ubicacion_reporsitory = new Ubicacion_repository();
class CompraRepository extends BaseRepository {
    constructor() {
        super(Nota_venta);
    }

    async entradasDisponiblesUbica(idhorario, idubicacion) {
        const entradas_vendidas = await _ubicacion_repository.getEntradasDisponibles(idhorario, idubicacion);
        const total_entradas = await _ubicacion_repository.getCantidadDePersonas(idubicacion);
        return total_entradas - entradas_vendidas;
    }
}

module.exports = CompraRepository;