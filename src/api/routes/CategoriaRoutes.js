const { Router } = require('express');
const CategoriaController = require('../controllers/CatergoriaController');
const { validateCreate } = require('../validators/CategoriaValidator');
const { verifyTokenAdmin } = require('../../middlewares/authMiddleware');
const router = new Router();

router.get('/categorias', CategoriaController.getAllCategoria);
router.get('/categorias/:id', CategoriaController.getCategoriaById);

router.post('/categorias', validateCreate, verifyTokenAdmin, CategoriaController.createCategoria);


module.exports = router;