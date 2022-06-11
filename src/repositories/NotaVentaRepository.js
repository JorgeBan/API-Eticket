const NotaVenta = require('../models/Nota_venta');
const DetalleNotaVenta = require('../models/Detalle_venta');
const BaseRepository = require('../repositories/BaseRepository');
class EspacioRepository extends BaseRepository {
    constructor() {
        super(NotaVenta);
    }

    async getAllNotasVenta(iduser) {
        try {
            let notasVenta = await this.model.findAll({
                where: {
                    idusuario: iduser
                }
            });
            return notasVenta;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getNotaVentaDetalle(iduser, nroNota) {
        try {
            let detalles = await this.model.findOne({
                include: [DetalleNotaVenta],
                where: {
                    idusuario: iduser,
                    nronota: nroNota
                }
            });
            return detalles;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
module.exports = EspacioRepository;