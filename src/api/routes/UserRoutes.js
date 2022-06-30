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
 */

//router.get('/admin/users/controlador', UserController.getControlador());

/**
 * @swagger
 *   /admin/users/roles:
 *     get:
 *       tags: [Usarios]
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
//router.get('/verifyTokenControlador', UserController.verifyTokenControlador());

module.exports = router;