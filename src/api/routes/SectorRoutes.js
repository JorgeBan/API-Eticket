const {Router} = require('express');
const SectorController = require('../controllers/SectorController');

const router = Router();

router.get('/sectores', SectorController.getAllSectores);
router.get('/sectores/:id', SectorController.getSectorById);

router.post('/sectores', SectorController.createSector);

router.put('/sectores/:id', SectorController.updateSector);

router.delete('/sectores/:id', SectorController.deleteSector);

module.exports = router;