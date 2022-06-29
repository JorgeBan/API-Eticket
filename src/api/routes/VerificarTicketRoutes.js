const { Router } = require('express');
const router = new Router();
const TicketController = require('../controllers/TicketController');

//ruta para desencryptar Tickets
router.post('/controller/infoTickets', TicketController.infoTickets);
module.exports = router;