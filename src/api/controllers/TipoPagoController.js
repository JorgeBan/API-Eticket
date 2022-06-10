const TipoPagoService = require('../../services/TipoPagoService');

const tipoPagoService = new TipoPagoService();
async function getTipoPagos(req, res) {
    try {
        const tipoPagos = await tipoPagoService.getTipoPagos();
        res.json(tipoPagos);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
}

module.exports = {
    getTipoPagos
};
