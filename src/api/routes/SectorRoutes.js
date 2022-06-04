const { Router } = require('express');
const SectorController = require('../controllers/SectorController');
const { validateCreate } = require('../validators/SectorValidator');


const router = Router();

router.get('/sectores', SectorController.getAllSectores);
router.get('/sectores/:id', SectorController.getSectorById);

router.post('/sectores', validateCreate, SectorController.createSector);

router.put('/sectores/:id', SectorController.updateSector);

router.delete('/sectores/:id', SectorController.deleteSector);

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
module.exports = router;