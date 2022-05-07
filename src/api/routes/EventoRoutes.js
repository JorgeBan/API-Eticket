const { Router } = require('express');
const EventoController = require('../controllers/EventoController');
const { validateCreate } = require('../validators/EventoValidator');
const router = new Router();

router.get('/eventosEncabezados', EventoController.getAllEventoEncabezados);
router.get('/eventosDatos', EventoController.getAllEventosDatos);
router.get('/eventosEncabezados/:id', EventoController.getEventoEncabezadosById);
router.get('/eventosDatos/:id', EventoController.getEventosDatosById);

router.post('/eventos', validateCreate,EventoController.createEvento);

router.put('/eventos/:id', EventoController.updateEvento);


router.delete('/eventos/:id', EventoController.deleteEvento);
module.exports = router;