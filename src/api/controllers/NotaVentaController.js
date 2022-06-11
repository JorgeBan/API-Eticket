const NotaVentaServices = require('../../services/NotaVentaServices');
const notaVentaServices = new NotaVentaServices();
const jwtConfig = require('../../config/services/jwtConfig');

async function getAllNotasVenta(req, res) {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        let tokenData = jwtConfig.getTokenData(token);
        let notasVenta = await notaVentaServices.getAllNotasVenta(tokenData.data.idusuario);
        res.status(200).json(notasVenta);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
}

async function getNotaVentaDetalle(req, res) {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        let tokenData = jwtConfig.getTokenData(token);
        let notaVenta = await notaVentaServices.getNotaVentaDetalle(tokenData.data.idusuario, req.params.nronota);
        res.status(200).json(notaVenta);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
}
module.exports = {
    getAllNotasVenta,
    getNotaVentaDetalle
}