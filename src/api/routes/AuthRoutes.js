const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const { loginValidator, registerValidator } = require('../validators/AuthValidator');
const { verifyTokenCliente } = require('../../middlewares/authMiddleware');
const router = new Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         nombre_usuario:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           required: true
 *         contrasena:
 *           type: string
 *           required: true
 *         rol:
 *           type: string  
 *           description: Solo puede ser cliente o admin
 *           required: true 
 *       example:
 *         nombre_usuario: usuario1
 *         email: usuario@mail.com
 *         contrasena: "123456"
 *         rol: cliente
 * 
 *     UserDTO:
 *       type: object
 *       properties:
 *         nombre_usuario:
 *           type: string
 *         email:
 *           type: string
 *         rol:
 *           type: string
 *         token:
 *           type: string
 *       example:
 *         nombre_usuario: usuario1
 *         email: usuario@mail.com
 *         rol: cliente
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     
 *     errorResponses:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         message:
 *           type: string   
 *    
 */

/**
 * @swagger
 *   /auth/login:
 *     post:
 *       summary: Inicia sesion
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               parameters:
 *                 email:
 *                   type: string
 *                   required: true
 *                 contrasena:
 *                   type: string
 *                   required: true
 *             example:
 *               email: test@mail.com
 *               contrasena: "12345"
 *       responses:
 *         200:
 *          description: Usuario logueado 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserDTO'
 *         400:
 *           description: Error datos invalidos
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/errorResponses'
 *               example:
 *                 status: 400
 *                 message: "El email no esta registrado"
 *         500:
 *           description: Error interno del servidor
 *          
 */
router.post('/auth/login', loginValidator, AuthController.login);

/**
 * @swagger
 *  /auth/register:
 *   post:
 *    summary: Registra un nuevo usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201: 
 *        description: Usuario registrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserDTO'
 *      400:
 *        description: Error datos invalidos
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponses'
 *            example:
 *              status: 400
 *              message: "El email ya esta registrado"
 *      500:
 *        description: Error interno del servidor
 */
router.post('/auth/register', registerValidator, AuthController.register);

router.get('/auth/confirm/:token', AuthController.verifyCount);


module.exports = router;
