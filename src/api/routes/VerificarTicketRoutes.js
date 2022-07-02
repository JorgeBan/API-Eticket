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


/**
 * @swagger
 *   /controlador/ticket/registro:
 *     post: 
 *       summary: Registra los tickets
 *       tags: [Control de ticket]
 *       description: El controlador registrara los tickets una vez haya verificado que es un ticket valido
 *       parameters:
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 * 
 *       requestBody:
 *         required: true
 *         description: Se requiere el idubicacion, y el idhorario para que no se registre cualquier ticket, y solo se puede registrar los tickets del evento que el controlador ha elegido para controlar, ambos ids vendran en el listado de eventos que el controlador tiene asignados
 *         content:
 *           application/json:
 *             schema:
 *               type: Object
 *               properties:
 *                 idticket:
 *                   type: string
 *                 idubicacion:
 *                   type: integer
 *                 idhorario:
 *                   type: integer
 *               example:
 *                 idticket: d37ea82f-4317-4026-9a48-6e69e18768f8
 *                 idubicacion: 50
 *                 idhorario: 57
 *                   
 *       responses: 
 *         200: 
 *           content:
 *             application/json:
 *               schema:
 *                 type: Object
 *                 properties:
 *                   msg: string
 * 
 *                 example:
 *                   msg: Ticket Registrado          
 *         
 *         400:
 *           description: Este error se lanzara en caso de que el qr del ticket escaneado sea de un evento distinto al que el controlador a seleccionado de su lista de eventos
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: integer
 *                   message:
 *                     type: string
 *                 example:
 *                   status: 400
 *                   message: El ticket no corresponde al evento seleccionado
 */
router.post('/controlador/ticket/registro', verifyTokenControlador, TicketController.registrarTicket)
module.exports = router;