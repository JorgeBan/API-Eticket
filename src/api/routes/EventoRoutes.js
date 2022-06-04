const { Router } = require('express');
const EventoController = require('../controllers/EventoController');
const { validateCreate, validateUpdateEstado } = require('../validators/EventoValidator');
const router = new Router();

router.get('/eventosEncabezados', EventoController.getAllEventoEncabezados);
router.get('/eventosDatos', EventoController.getAllEventosDatos);
router.get('/eventosEncabezados/:id', EventoController.getEventoEncabezadosById);
router.get('/eventosDatos/:id', EventoController.getEventosDatosById);

router.post('/eventos', validateCreate, EventoController.createEvento);

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
 *      Ubicacion:
 *        type: object
 *        properties:
 *          idubicacion:
 *            type: integer
 *          nombre:
 *            type: string
 *          direccion:
 *            type: string
 *          latitud:
 *            type: decimal
 *          longitud:
 *            type: decimal
 *          cantidad_de_personas:
 *            type: integer
 *          idevento:
 *            type: integer
 *          capacidad_disponible:
 *            type: integer
 *          precio:
 *            type: decimal
 *        example:
 *          idubicacion: 1
 *          nombre: Ubicacion 1
 *          direccion: Calle 1
 *          latitud: -34.6
 *          longitud: -58.3
 *          cantidad_de_personas: 100
 *          idevento: 1
 *          capacidad_disponible: 10
 * 
 *      EventoDetalle:
 *        type: object
 *        properties:
 *          idevento:
 *            type: integer
 *          nombre:
 *            type: string
 *          descripcion:
 *            type: string
 *          contacto:
 *            type: integer
 *          categoria:
 *            type: string
 *          imagenes:
 *            type: array
 *            items:
 *              type: string
 *          ubicaciones:
 *            type: array
 *            items:
 *              type: object
 *              $ref: '#/components/schemas/Ubicacion'
 *                     
 *        example:
 *          idevento: 1
 *          nombre: Evento 1
 *          descripcion: Descripcion del evento 1
 *          contacto: 0
 *          categoria: conferencia
 *          imagenes:
 *            - https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
 *            - https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
 *          ubicaciones:
 *            - idubicacion: 1
 *              nombre: Ubicacion 1
 *              direccion: Calle 1
 *              latitud: -34.6
 *              longitud: -58.3
 *              cantidad_de_personas: 100
 *              idevento: 1
 *              capacidad_disponible: 10
 *          
 *          
*/

//router.get('/public/eventos', EventoController.getAllPublicEventos);


//router.get('/public/eventos/filtro', EventoController.getPublicEventoByCategoria);


/**
 * @swagger
 *   /public/eventos:
 *     get:
 *       summary: Obtiene todos los eventos publicos y activos
 *       description: Obtiene todos los eventos publicos y activos, se puede filtrar por categoria, nombre o ambos
 *       tags: [EventoPublico]
 *       parameters:
 *         - in: query
 *           name: categoria
 *           description: categoria del evento (Opcional)
 *         - in: query
 *           name: nombre
 *           description: nombre del evento (Opcional)
 *       responses: 
 *         200:
 *           description: Lista de eventos publicos y activos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                  $ref: '#/components/schemas/EventoActivo'
 *         500:
 *           description: Error del servidor
 * 
 */
router.get('/public/eventos', EventoController.getAllEventos);

//Obtener los detalles de un evento atravez de su id
/**
 * @swagger
 *   /public/eventos/{id}:
 *     get:
 *       summary: Obtiene los detalles de un evento mediante su id
 *       tags: [EventoPublico]
 *       parameters:
 *         - in: path
 *           name: id
 *           description: id del evento
 *           required: true
 *       responses:
 *         200:
 *           description: Detalles del evento
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/EventoDetalle' 
 *         
 *         404:
 *           description: No se encontro el evento
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                   message:
 *                     type: string
 *                 example:
 *                   status: 404
 *                   message: No se encontro el evento 
 *      
 *                  
 */
router.get('/public/eventos/:id', EventoController.getEventoById);
module.exports = router;