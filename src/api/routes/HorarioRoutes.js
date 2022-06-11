const { Router } = require('express');
const HorarioController = require('../controllers/HorarioController');
const { validateCreate } = require('../validators/HorarioValidator');
const { verifyTokenAdmin } = require('../../middlewares/authMiddleware');

const router = Router();

router.get('/horarios', verifyTokenAdmin, HorarioController.getAllHorarios);
router.get('/horarios/:id', verifyTokenAdmin, HorarioController.getHorarioById);

router.post('/horarios', validateCreate, verifyTokenAdmin, HorarioController.createHorario);

router.put('/horarios/:id', verifyTokenAdmin, HorarioController.updateHorario);

router.delete('/horarios/:id', verifyTokenAdmin, HorarioController.deleteHorario);


//rutas para el manejo de los eventos del lado del cliente final

/**
 * @swagger
 * components:
 *   schemas:
 *     Horario:
 *       type: object
 *       properties:
 *         idHorario:
 *           type: integer
 *         fecha_hora:
 *           type: date
 *         idUbicacion:
 *           type: integer
 *           description: id de la ubicacion a la que pertenece el horario
 *       example:
 *         idHorario: 1
 *         fecha_hora: 2020-05-01T00:00:00.000Z
 *         idUbicacion: 1 
 */

/***
 * @swagger
 * /public/horarios/{idubicacion}:
 *   get:
 *     tags: [Horarios]
 *     summary: Obtiene los horarios de una categoria 
 *     description: No toma en cuenta los horarios que estan antes de la hora y fecha actual
 *     parameters:
 *       - in: path
 *         name: idubicacion
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Horario'
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: integer
 *                 message:
 *                   type: string
 *               example:
 *                 status: 400
 *                 message: Se requiere del id de la ubicación que debe ser un número
 */
router.get('/public/horarios/:idubicacion', HorarioController.getHorariosByCategoria);
module.exports = router;
