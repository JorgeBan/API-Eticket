const { Router } = require('express');
const UserController = require('../controllers/UserController.js');
const { verifyTokenAdmin } = require('../../middlewares/authMiddleware');
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
 *                   
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
router.post('/admin/asignar/controlador', UserController.asignarControlador);
module.exports = router;