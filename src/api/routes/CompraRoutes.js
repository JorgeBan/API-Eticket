const { Router } = require('express');
const CompraController = require('../controllers/CompraController');
const { verifyTokenCliente } = require('../../middlewares/authMiddleware');
const { compraValidator } = require('../validators/CompraValidator');
const router = Router();


router.post('/Compras', verifyTokenCliente, compraValidator, CompraController.Comprar);


module.exports = router;