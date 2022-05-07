const { Router } = require('express');
const EspacioController = require('../controllers/EspacioController');
const router = Router();

router.get('/espacios', EspacioController.getAllEspacios);
router.get('/espacios/:id', EspacioController.getEspacioById);

router.post('/espacios', EspacioController.createEspacio);

router.put('/espacios/:id', EspacioController.updateEspacio);

router.delete('/espacios/:id', EspacioController.deleteEspacio);

module.exports = router;
