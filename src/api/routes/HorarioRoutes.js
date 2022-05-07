const { Router } = require('express');
const HorarioController = require('../controllers/HorarioController');
const {validateCreate} = require('../validators/HorarioValidator');

const router = Router();

router.get('/horarios', HorarioController.getAllHorarios);
router.get('/horarios/:id', HorarioController.getHorarioById);

router.post('/horarios', validateCreate, HorarioController.createHorario);

router.put('/horarios/:id', HorarioController.updateHorario);

router.delete('/horarios/:id', HorarioController.deleteHorario);

module.exports = router;
