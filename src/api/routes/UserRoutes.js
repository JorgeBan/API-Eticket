const { Router } = require('express');
const UserController = require('../controllers/UserController.js');
const { verifyTokenAdmin, verifyTokenControlador } = require('../../middlewares/authMiddleware');
const router = Router();



/**
 * @swagger
 *   components:
 *     schemas:
 *       Rol:
 *         type: object
 *         properties:
 *           idrol:
 *             type: String
 *           nombre:
 *             type: String
 *           description:
 *             type: String
 *         example: 
 *           idrol: 1
 *           nombre: admin
 *           description: rol de administrador
 * 
 *             
 *       Controlador: 
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           nombre:
 *             type: string       
 *           rol:
 *             type: string
 *         example:
 *           id: 1
 *           nombre: controlador
 *           rol: Controlador
 *               
 *       EventoControlador:
 *         type: object
 *         properties:
 *           evento:
 *             type: string
 *           idubicacion:
 *             type: integer
 *           ubicacion:
 *             type: string
 *           idhorario:
 *             type: integer
 *           fecha:
 *             type: string
 *           hora:
 *             type: string
 *        
 *         example: 
 *           evento: Nombre del evento
 *           idubicacion: 40
 *           ubicacion: Nombre de la ubicacion
 *           idhorario: 25
 *           fecha: 25/07/2022
 *           hora: 17:00                          
 *                             
 *                          
 */


/**
 * @swagger
 *   /admin/users/controlador:
 *     get:
 *       summary: Obtiene todos los usuarios con rol del controlador que esten verificados 
 *       tags: [Usuarios]
 *       parameters:
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 *           required: true
 *          
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Controlador'
 */
router.get('/admin/users/controlador', verifyTokenAdmin, UserController.getAllControlador);

/**
 * @swagger
 *   /admin/users/roles:
 *     get:
 *       tags: [Usuarios]
 *       summary: Obtiene todos los roles de usuario para poder registrarlos
 *       parameters:
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 *           required: true
 *      
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:                 
 *                   $ref: '#/components/schemas/Rol'
 *                 
 */
router.get('/admin/users/roles', verifyTokenAdmin, UserController.getRoles);


/**
 * @swagger
 *   /verifyTokenControlador:
 *     post:
 *       summary: Verifica si un usuario es un controlador
 *       tags: [Usuarios] 
 *       parameters:
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 *           required: true
 * 
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                 example:
 *                   message: Usuario Valido 
 *         401:
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
 *                   status: 401
 *                   message: Usuario no valido
 * 
 */
router.post('/verifyTokenControlador', UserController.verifyTokenControlador);


/**
 * @swagger
 *   /admin/asignar/controlador:
 *     post:
 *       summary: Asigna controladores a un evento
 *       tags: [Usuarios]
 *       parameters:
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 *           required: true
 *       
 *       requestBody:
 *         description: Se solicita los id del evento, ubicacion, y horario, ademas del usuario a asignar
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   idcontrolador:
 *                     type: string
 *                     description: id del usuario controlador
 *                     required: true
 *                   idevento:
 *                      type: integer
 *                      required: true
 *                   idubicacion:
 *                      type: integer
 *                      required: true
 *                   idhorario:
 *                      type: integer
 *                      required: true
 *                 example:
 *                   idcontrolador: ccsdjosds-sds45sdsddsds-sds45sdsddsds
 *                   idevento: 1
 *                   idubicacion: 10
 *                   idhorario: 25 
 *                      
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   idcontrolador:
 *                     type: string
 *                     description: id del usuario controlador
 *                     required: true
 *                   idevento:
 *                      type: integer
 *                      required: true
 *                   idubicacion:
 *                      type: integer
 *                      required: true
 *                   idhorario:
 *                      type: integer
 *                      required: true
 *                 example:
 *                   idcontrolador: ccsdjosds-sds45sdsddsds-sds45sdsddsds
 *                   idevento: 1
 *                   idubicacion: 10
 *                   idhorario: 25                               
 *                     
 *         400:
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
 *                   message: Los datos incorrectos o el usuario ya ha sido asignado al evento
 * 
 *                 
 *                              
 *                       
 */
router.post('/admin/asignar/controlador', verifyTokenAdmin, UserController.asignarControlador);


/**
 * @swagger
 *   /controlador/eventos:
 *     get: 
 *       summary: Obtiene todos los eventos asignados de un controlador
 *       description: devuelve una lista con todos los eventos a los que ha sido asignado un controlador, no devolvera los eventos cuya fecha haya pasado la actual, los eventos se seguiran mostrando hasta 4 horas despues de la fecha y hora programada del evento, pasada las 4 horas, dicho evento ya no se mostrara, por ejemplo si un evento fue programado para el 14/07/2022 a las 17:00, el evento sera devuelto hasta las 21:00 de la misma fehca, esto para no mostrar todos los eventos pasados, y las 4 horas asignas para el control del evento 
 *       tags: [Control de ticket]
 *       parameters:
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 *           required: true
 *       
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/EventoControlador'
 */
router.get('/controlador/eventos', verifyTokenControlador, UserController.getEventosControlador);

/**
 * @swagger
 *   /admin/eventos/controladores/{idevento}:
 *     get: 
 *       summary: obtiene una lista con todos los controladores asignados a un evento
 *       tags: [Usuarios]
 *       parameters:
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 *           required: true
 *       
 *         - in: path 
 *           name: idevento
 *           required: true
 *       
 *       responses:
 *         200: 
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Controlador'
 */
router.get('/admin/eventos/controladores/:idevento', verifyTokenAdmin, UserController.getControladoresEvento);


/**
 * @swagger
 *   /admin/eventos/controladores/{idcontrolador}/{idubicacion}/{idhorario}:
 *     delete:
 *        summary: Quita a un controlador de un evento
 *        tags: [Usuarios]
 *        parameters: 
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 *           required: true
 *        
 *        responses:
 *          200: 
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message: string
 *                  example: 
 *                    message: Eliminado con exito
 *          404: 
 *            content:
 *              application/json:
 *                schema:
 *                 type: object 
 *                 properties:
 *                   status: number
 *                   message: string
 *                 example:
 *                   status: 404
 *                   message: Informacion incorrecta
 * 
 * 
 */
router.delete('/admin/eventos/controladores/:idcontrolador/:idubicacion/:idhorario', verifyTokenAdmin, UserController.quitarControlador);
module.exports = router;