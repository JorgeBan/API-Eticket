const ReporteServices = require('../../services/ReporteServices');
const _reporteServices = new ReporteServices();
async function getReporte(req, res) {
    try {
        let reporte = await _reporteServices.getReporte(req.params.idubicacion);
        res.status(200).json(reporte);
    } catch (e) {
        console.log(e);
        res.status(e.status || 500).json(e);
    }
}

module.exports = {
    getReporte
}