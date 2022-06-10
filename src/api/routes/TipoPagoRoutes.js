const { Router } = require('express');
const TipoPagoController = require('../controllers/TipoPagoController');
const router = Router();
/**
 * @swagger
 *   components:
 *     schemas:
 *       TipoPago:
 *         type: object
 *         properties:
 *           idpago:
 *             type: integer
 *           nombre:
 *             type: string
 *         example: 
 *           idpago: 1
 *           nombre: Tigo Money
 */

/**
 * @swagger
 *   /TipoPagos:
 *     get:
 *       summary: Obtiene todos los tipos de pago
 *       description: Obtiene todos los tipos de pagos
 *       tags: [TipoPago]
 *       responses:
 *         200:
 *           description: Retorna un arreglo de tipos de pagos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/TipoPago'
 *                 
 *              
 *                    
 *    
 */
router.get('/TipoPagos', TipoPagoController.getTipoPagos);

module.exports = router;