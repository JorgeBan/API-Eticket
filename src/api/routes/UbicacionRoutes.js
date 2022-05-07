const { Router } = require('express');
const UbicacionController = require('../controllers/UbicacionController');
const { validateCreate } = require('../validators/UbicacionValidator');
const router = Router();

router.get('/ubicaciones', UbicacionController.getAllUbicaciones);
router.get('/ubicaciones/:id', UbicacionController.getUbicacionById);

router.post('/ubicaciones',validateCreate, UbicacionController.createUbicacion);
router.put('/ubicaciones/:id', UbicacionController.updateUbicacion);

router.delete('/ubicaciones/:id', UbicacionController.deleteUbicacion);

module.exports = router;