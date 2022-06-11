const { Router } = require('express');
const NotaVentaController = require('../controllers/NotaVentaController');
const { verifyTokenCliente } = require('../../middlewares/authMiddleware');
const router = Router();


/**
 * @swagger
 *   components:
 *     schemas:
 *       DetalleVenta:
 *         type: object
 *         properties:
 *           descripcion:
 *             type: string
 *           cantidad: 
 *             type: number
 *           precio_unitario:
 *             type: number
 *           importe:
 *             type: number
 *         example:
 *           descripcion: "Entrada/s para el evento en el sector A"
 *           cantidad: 2
 *           precio_unitario: 10
 *           importe: 20
 *          
 *       NotaVentaEncabezado:
 *        type: object
 *        properties:
 *          nronota:
 *            type: integer
 *          fecha_emision:
 *            type: string
 *          precio_total:
 *            type: number
 *          evento:
 *            type: string
 *          tipo_pago:
 *            type: string
 *        example:
 *          nronota: 1
 *          fecha_emision: "2020-05-01 15:00:00"
 *          precio_total: 100
 *          evento: Evento 1
 *          tipo_pago: Tigo Money
 *       
 *       NotaVentaDetalle:
 *         type: object
 *         properties:
 *           nronota:
 *             type: integer
 *           fecha_emision:
 *             type: string
 *           precio_total:
 *             type: number
 *           evento:
 *             type: string
 *           tipo_pago:
 *             type: string
 *           detalles:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/DetalleVenta'  
 *         example:
 *           nronota: 1
 *           fecha_emision: "2020-05-01 15:00:00"
 *           precio_total: 100
 *           evento: Evento 1
 *           tipo_pago: Tigo Money
 *           detalles: [{descripcion: "Entrada/s para el evento en el sector A", cantidad: 2, precio_unitario: 20, importe: 40}, {descripcion: "Entrada/s para el evento en el sector B", cantidad: 2, precio_unitario: 30, importe: 60}]
 */

/** 
 * @swagger
 *   /notaventa/:
 *   get:
 *     tags: [NotaVenta]
 *     summary: Obtener todas las notas de venta de un usuario (Solo el encabezado)
 *     parameters:
 *       - in: header
 *         name: authorization
 *         description: token de autorizacion de tipo Bearer
 *         required: true
 *     
 *     responses:
 *       200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/NotaVentaEncabezado'
 */
router.get('/notaVenta/', verifyTokenCliente, NotaVentaController.getAllNotasVenta);

/**
 * @swagger
 *   /notaventa/detalle/{nrnota}:
 *     get:
 *       tags: [NotaVenta]
 *       summary: Obtener todos los detalles de una nota de venta
 *       parameters:
 *         - in: path
 *           name: nrnota
 *           description: Numero de nota de venta
 *           required: true
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
 *                 $ref: '#/components/schemas/NotaVentaDetalle' 
 *     
 *    
 */
router.get('/notaVenta/detalle/:nronota', verifyTokenCliente, NotaVentaController.getNotaVentaDetalle);
module.exports = router;