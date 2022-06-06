const { Router } = require('express');
const EspacioController = require('../controllers/EspacioController');
const { validateCreate } = require('../validators/EspacioValidator');

const router = Router();
/**
 * @swagger
 *   components:
 *     schemas:
 *       Espacio:
 *         type: object
 *         properties:
 *           idespacio:
 *             type: integer
 *           identificador:
 *             type: string
 *           tipo_de_espacio:
 *             type: string
 *           cantidad_de_personas:
 *             type: integer
 *           idsector:
 *             type: integer
 *           precio:
 *             type: decimal
 *         example:
 *           idespacio: 1
 *           identificador: A1
 *           tipo_de_espacio: Butaca
 *           cantidad_de_personas: 1
 *           idsector: 1
 *           precio: 100
 *           
 */
router.get('/espacios', EspacioController.getAllEspacios);
router.get('/espacios/:id', EspacioController.getEspacioById);

router.post('/espacios', validateCreate, EspacioController.createEspacio);
router.post('/espacios/:cantidad', validateCreate, EspacioController.createAllEspacios);


router.put('/espacios/:id', EspacioController.updateEspacio);

router.delete('/espacios/:id', EspacioController.deleteEspacio);


//rutas para el manejon de los espacios reservados
/**
 * @swagger
 *   /public/espacios/:
 *     get:
 *       summary: Obtiene todos los espacios "Disponibles", se requiere el id del sector y el id del horario
 *       tags: [Espacios]
 *       parameters:
 *         - in: query
 *           name: idsector
 *           description: id del sector del que se requiere los espacios
 *           required: true
 *         - in: query
 *           name: idhorario
 *           description: id del horario del que se requiere los espacios
 *           required: true
 *       responses:
 *         200:
 *           description: Lista de los espacios disponibles de un sector
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Espacio' 
 *         
 *         400: 
 *           description: El id del sector o el id del horario no son validos
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
 *                   message: idsector y idhorario deben ser numeros
 *         404:
 *           description: El horario no existe
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
 *                   message: El horario no existe 
 *      
 *                  
 */
router.get('/public/espacios/', EspacioController.getAllEspaciosLibres);
module.exports = router;
