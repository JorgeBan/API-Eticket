const { Router } = require('express');
const SectorController = require('../controllers/SectorController');
const { validateCreate } = require('../validators/SectorValidator');
const { verifyTokenAdmin } = require('../../middlewares/authMiddleware');


const router = Router();

router.get('/sectores', verifyTokenAdmin, SectorController.getAllSectores);
router.get('/sectores/:id', verifyTokenAdmin, SectorController.getSectorById);

router.post('/sectores', validateCreate, verifyTokenAdmin, SectorController.createSector);

router.put('/sectores/:id', verifyTokenAdmin, SectorController.updateSector);

router.delete('/sectores/:id', verifyTokenAdmin, SectorController.deleteSector);

/**
 * @swagger
 *  components:
 *    schemas:
 *      SectorDTO:
 *        type: object
 *        properties:
 *          idsector: 
 *            type: integer
 *          nombre:
 *            type: string
 *          referencia:
 *            type: string
 *          idubicacion:
 *            type: integer
 *          precio:
 *            type: decimal
 *        example:
 *          idsector: 1
 *          nombre: "Sector 1"
 *          referencia: "Sector 1"
 *          idubicacion: 1
 *          precio: 100.00
 *            
 */


//Rutas para el manejo de los eventos del lado del cliente final+
/**
 * @swagger
 *   /public/sectores/{idubicacion}:
 *     get:
 *       tags: [Sector]
 *       summary: Obtiene los sectores de una ubicacion
 *       parameters:
 *         - in: path
 *           name: idubicacion
 *           description: Id de la ubicacion de los que se desean obtener los sectores
 *           required: true
 *       responses:
 *         200:
 *           description: Sectores de la ubicacion
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/SectorDTO'
 *         400:
 *           description: Error en la solicitud
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: integer
 *                   message:
 *                      type: string
 *                 example:
 *                   status: 400
 *                   message: "El id de la ubicacion debe ser un numero"
 */

router.get('/public/sectores/:idubicacion', SectorController.getSectoresByUbicacion);
//Obtener la cantidad de entradas disponibles para un horario en un sector
/**
 * @swagger
 *   /public/sectores/entradas/disponibles:
 *     get:
 *       summary: Obtiene los sectores disponibles para un horario
 *       tags: [Sector]
 *       parameters:
 *         - in: query
 *           name: idhorario
 *           required: true
 *         - in: query
 *           name: idsector
 *           required: true
 *       responses:
 *         200:
 *           description: Devuelve la cantidad de entradas disponibles
 *         400:
 *           description: El id del horario o el sector debe ser un numero
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
 *                    message: El id del horario o el sector debe ser un numero
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
 *                   message: NO hay sector con ese id 

 *                  
 */
router.get('/public/sectores/entradas/disponibles', SectorController.getEntradasDisponibles);


module.exports = router;