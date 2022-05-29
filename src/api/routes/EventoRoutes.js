const { Router } = require('express');
const EventoController = require('../controllers/EventoController');
const { validateCreate, validateUpdateEstado } = require('../validators/EventoValidator');
const router = new Router();

router.get('/eventosEncabezados', EventoController.getAllEventoEncabezados);
router.get('/eventosDatos', EventoController.getAllEventosDatos);
router.get('/eventosEncabezados/:id', EventoController.getEventoEncabezadosById);
router.get('/eventosDatos/:id', EventoController.getEventosDatosById);

router.post('/eventos', validateCreate,EventoController.createEvento);

router.put('/eventos/:id', EventoController.updateEvento);
router.put('/eventos/estado/:id', validateUpdateEstado, EventoController.updateEstadoEvento);

router.delete('/eventos/:id', EventoController.deleteEvento);


//rutas para el manejo de los eventos del lado del cliente final
/**
 * @swagger
 *  components:
 *    schemas:
 *      EventoActivo:
 *        type: object
 *        properties:
 *          idevento:
 *            type: integer
 *          nombre:
 *            type: string
 *          descripcion:
 *            type: string
 *          estado:
 *            type: string
 *          categoria:
 *            type: string
 *          imagenes: 
 *            type: array
 *            items:
 *              type: string
 *        example: 
 *          idevento: 1
 *          nombre: Evento 1
 *          descripcion: Descripcion del evento 1
 *          estado: Activo
 *          categoria: conferencia
 *          imagenes: 
 *            - https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
 *            - https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png 
 *      
 *    
 *  
*/

/**
 * @swagger
 *   /public/eventos:
 *     get:
 *       summary: Obtiene todos los eventos publicos y activos
 *       tags: [EventoPublico]
 *       responses: 
 *         200:
 *           description: Lista de eventos publicos y activos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/EventoActivo'
 * 
 */
router.get('/public/eventos', EventoController.getAllPublicEventos);
module.exports = router;