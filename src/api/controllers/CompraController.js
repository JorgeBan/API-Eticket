const CompraService = require('../../services/CompraServices');
const compraService = new CompraService();

async function Comprar(req, res) {
    try {
        console.log(req.body);
        const result = await compraService.Comprar(req.body.DatosUsuario, req.body.DatosCompra);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

module.exports = {
    Comprar
}