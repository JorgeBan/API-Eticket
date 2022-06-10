const TipoPago = require('../models/Tipo_pago');
const BaseRepository = require('../repositories/BaseRepository');
class TipoPagoRepository extends BaseRepository {
    constructor() {
        super(TipoPago);
    }
    async getTipoPagos() {
        try {
            return await this.model.findAll();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
module.exports = TipoPagoRepository;