const { Router } = require('express');
const UbicacionController = require('../controllers/UbicacionController');
const { validateCreate } = require('../validators/UbicacionValidator');
const router = Router();

router.get('/ubicaciones', UbicacionController.getAllUbicaciones);
router.get('/ubicaciones/:id', UbicacionController.getUbicacionById);

router.post('/ubicaciones', validateCreate, UbicacionController.createUbicacion);
router.put('/ubicaciones/:id', UbicacionController.updateUbicacion);

router.delete('/ubicaciones/:id', UbicacionController.deleteUbicacion);


//rutas para el lado del cliente final
/**
 * @swagger
 *   /public/ubicaciones/entradas_disponibles:
 *     get:
 *       summary: Obtiene las ubicaciones disponibles para un horario
 *       tags: [Ubicaciones]
 *       parameters:
 *         - in: query
 *           name: idhorario
 *           required: true
 *         - in: query
 *           name: idubicacion
 *           required: true
 *       responses:
 *         200:
 *           description: Devuelve la cantidad de entradas disponibles
 *         400:
 *           description: El id del horario o la ubicacion debe ser un numero
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status: 
 *                      type: integer
 *                    message:
 *                      type: string
 *                  example:
 *                    status: 400
 *                    message: El id del horario o la ubicacion debe ser un numero
 *         404:
 *           description: No se encontro el horario o la ubicacion
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
 *                   status: 404
 *                   message: NO hay ubicacion con ese id 

 *                  
 */
router.get('/public/ubicaciones/entradas_disponibles', UbicacionController.getEntradasDisponibles);
module.exports = router;