const { Router } = require('express');
const router = new Router();
const TicketController = require('../controllers/TicketController');
const { verifyTokenControlador } = require('../../middlewares/authMiddleware');

//ruta para desencryptar Tickets
/**
 * @swagger
 *   components:
 *     schemas:
 *       infoTickets:
 *         type: object
 *         properties:
 *           ticket:
 *             type: string
 *             description: Identificador unico del ticket 
 *           evento:
 *             type: string
 *           fecha:
 *             type: string
 *           hora:
 *             type: string
 *           ubicacion:
 *             type: string
 *           sector:
 *             type: string
 *           espacio:
 *             type: string
 *           usuario:
 *             type: string
 *             description: usuario que compro el ticket
 *           email:
 *             type: string
 *           estado:
 *             type: string
 *             description: Estado que muestra si un ticket ya ha sido usado o no
 *           
 *         example:
 *           ticket: 02cc05cc-fc36-4e16-923a-49a006ee11c0
 *           evento: Oriente Petrolero VS Blooming
 *           fecha: 10/7/2022
 *           hora: 17:00
 *           ubicacion: Estadio Ramón Aguilera Costas
 *           sector: Preferencia
 *           espacio: N/A
 *           usuario: test
 *           email: test@mail.com
 *           estado: disponible  
 */

/**
 * @swagger
 *   /controlador/infoTickets:
 *     post: 
 *       tags: [Control de ticket] 
 *       summary: Obtiene la informacion del ticket a traves del codigo qr
 *       description: Obtendra los datos de un ticket, mediante el codigo encriptado en el Qr , en caso de no ser un qr valido se lanza una excepcion, en caso de ser valido devuelve los datos, la persona sera la encargada de verificar si el ticket ya fue usado o no  
 *       parameters:
 *         - in: header
 *           name: authorization
 *           schema:
 *              type: string
 *           description: Token de autorizacion de tipo Bearer
 *           required: true
 *         
 *       requestBody:
 *         description: Se envia la cadena encripdata obtenida del codigo QR
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 codeTicket: 
 *                   type: string
 *               example:
 *                 codeTicket: U2FsdGVkX1+0tzhQIyF+o/HbyGoZYHOb9sdeFMLfvhjdTNblSwn8RD/RaCY7jfREUDLyHqYxkZwC7pfOZx29EU2TDUeLZmC+I3gLXQUD7QOafoLS1VbMhTdUYFznjJDP/aAPvDIC2wQCViqabSsXdANFViaSdU4Ra27+GwwkmzA=
 *                            
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: Object
 *                 $ref: '#/components/schemas/infoTickets'
 *  
 *                      
 *         
 *                    
 *                 
 * 
 */
router.post('/controlador/infoTickets', verifyTokenControlador, TicketController.infoTickets);
module.exports = router;