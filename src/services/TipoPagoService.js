const TipoPagoRepository = require('../repositories/TipoPagoRepository');
const BaseService = require('./BaseServices');
class TipoPagoService extends BaseService {
    constructor() {
        super(new TipoPagoRepository());
        this._tipoPagoRepository = new TipoPagoRepository();
    }
    async getTipoPagos() {
        try {
            return await this._tipoPagoRepository.getTipoPagos();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = TipoPagoService;