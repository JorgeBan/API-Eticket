const { Router } = require('express');
const ImagenEventoController = require('../controllers/ImagenEventoController');
const router = Router();
const upload = require('../../config/images/multer');

router.get('/imagenesEvento', ImagenEventoController.getAllImagenesEventos);
router.get('/imagenesEvento/:id', ImagenEventoController.getImagenEventoById);

router.post('/imagenesEvento', upload.array('image'), ImagenEventoController.createImagenEvento);

module.exports = router;