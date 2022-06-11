const { Router } = require('express');
const ImagenEventoController = require('../controllers/ImagenEventoController');
const { verifyTokenAdmin } = require('../../middlewares/authMiddleware');

const router = Router();
const upload = require('../../config/images/multer');

router.get('/imagenesEvento', verifyTokenAdmin, ImagenEventoController.getAllImagenesEventos);
router.get('/imagenesEvento/:id', verifyTokenAdmin, ImagenEventoController.getImagenEventoById);

router.post('/imagenesEvento', upload.array('image'), verifyTokenAdmin, ImagenEventoController.createImagenEvento);

router.delete('/imagenesEvento/:id', verifyTokenAdmin, ImagenEventoController.deleteImagenEvento);

module.exports = router;