const { Router } = require('express');
const router = new Router();
const TicketController = require('../controllers/TicketController');
const { verifyTokenControlador } = require('../../middlewares/authMiddleware');

//ruta para desencryptar Tickets
router.post('/controlador/infoTickets', verifyTokenControlador, TicketController.infoTickets);
module.exports = router;