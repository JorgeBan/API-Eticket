const { Router } = require('express');
const ReporteController = require('../controllers/ReporteController');
const { verifyTokenAdmin } = require('../../middlewares/authMiddleware');

const router = Router();

router.get('/admin/reporte/:idubicacion', verifyTokenAdmin, ReporteController.getReporte);

router.post('/admin/reporte/download', ReporteController.getReportePDF);
module.exports = router;