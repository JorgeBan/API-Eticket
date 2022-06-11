const { Router } = require('express');
const CompraController = require('../controllers/CompraController');
const { verifyTokenCliente } = require('../../middlewares/authMiddleware');
const { compraValidator } = require('../validators/CompraValidator');
const router = Router();

/**
 * @swagger
 *   components:
 *     schemas:
 *       DatosCliente:
 *         type: object
 *         properties:
 *           nombres:
 *             type: string
 *             required: true
 *           apellidos:
 *             type: string
 *             required: true
 *           telefono:
 *             type: integer
 *           email:
 *             type: string
 *             required: true
 *         example:
 *           nombres: Juan
 *           apellidos: Perez
 *           telefono: 1234567
 *           email: JuanPerez@mail.com  
 *        
 *       DatosCompra:
 *         type: object
 *         properties:
 *           tipoPago:
 *             type: integer
 *             description: id del tipo de pago seleccionado
 *             required: true
 *           idhorario:
 *             type: integer
 *             required: true
 *           idubicacion:
 *             type: integer
 *             required: true
 *           idevento:
 *             type: integer 
 *             required: true
 *           cantidad:
 *             type: integer
 *             description: cantidad de boletos a comprar, es requerido cuando se compra boletos solo con ubicacion, si se compra con sectores o espacios, no es necesario, puede ser 0 o null
 *           sectores:
 *             type: array
 *             description: requerido si es un evento con sectores, el sector puede tener espacios o no
 *             items:
 *               type: object
 *               properties:
 *                 idsector:
 *                   type: integer
 *                   required: true
 *                 cantidad:
 *                   type: integer
 *                   description: cantidad de boletos a comprar, es requerido cuando se compra boletos solo con sector, si se compra con sectores con espacios, no es necesario, puede ser 0 o null
 *                 espacios:
 *                   type: array
 *                   description: requerido si es un evento con sectores y con espacios, si solo tiene sectores no es necesario, puede ser 0 o null
 *                   items:
 *                     type: object
 *                     properties:
 *                       idespacio:
 *                         type: integer
 *                         required: true
 *         
 *         example:
 *           tipoPago: 1
 *           idhorario: 1
 *           idubicacion: 1
 *           idevento: 1
 *           cantidad: 1
 *           sectores: [{idsector: 1, espacios: [{idsector: 1}, {idsector: 2}]}, {idsector: 2, cantidad: 1}]
 *        
 *       NotaVenta:
 *         type: object
 *         description: Nota de venta para el evento, la fecha es tipo date y el precio decimal(6,2). Swagger no soporta el tipo date ni el decimal, por eso se usa un string
 *         properties:
 *           nronota:
 *             type: integer
 *           fecha_emision:
 *              type: string
 *           precio_total:
 *              type: string
 * 
 *         example:
 *           nronota: 1
 *           fecha_emision: 2022-06-09T04:28:19.213Z
 *           precio_total: 123.45
 *   
 *       Compra:
 *         type: object
 *         properties:
 *           status:
 *             type: integer
 *           message:
 *             type: string
 *           nota_venta:
 *             $ref: '#/components/schemas/NotaVenta'
 *         example:
 *           status: 200
 *           message: Compra realizada con exito, revisa tu correo correoMandado@enElBody.com para verificar tus tickets, gracias por la compra
 *           nota_venta: {nronota: 1, fecha_emision: 2022-06-09T04:28:19.213Z, precio_total: 123.45}
 */

/**
 * @swagger
 *   /Compras:
 *     post:
 *       tags:  [Compra]
 *       summary: realiza la compra de tickets
 *       description: Permite realizar la compra de tickets de una sola ubicacion y un solo horario por compra, pero puede seleccionar tickets de los distintos sectores de la ubicacion
 *       parameters:
 *         - in: header
 *           name: authorization
 *           description: token de autorizacion de tipo Bearer
 *           required: true
 *        
 *       requestBody:
 *         description: Datos de la compra, se requerie de los datos del cliente para la nota de venta, y la informacion de la compra, el idevento,idubicacion, y el idhorario deben estar relacionados, es decir el horario debe pertenecer a la ubicacion, y las ubicaciones al evento, caso contrario se arroja error de datos incorrectos
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 DatosUsuario: 
 *                   $ref: '#/components/schemas/DatosCliente'
 *                 DatosCompra:
 *                   $ref: '#/components/schemas/DatosCompra'
 *       responses:
 *         200:
 *           description: devolvera un mensaje y la cabezera de la nota de venta generada
 *           content:  
 *             application/json:
 *               schema:
 *                 type: object 
 *                 $ref: '#/components/schemas/Compra'
 *         
 *         400:
 *           description: si los datos de la compra no son correctos. como que falte la cantidad o que la cantidad sea 0
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *               
 *               example:
 *                 status: 400
 *                 message: La cantidad debe ser mayor a 0
 *         
 *         404:
 *           description: si los datos son incorrectos, puede ser porque el evento no coincide con la ubicacion o el horario, o porque no haya entradas disponibles 
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message: 
 *                   type: string
 *               example:
 *                 status: 404
 *                 message: El evento no coincide con la ubicacion o el horario
 *           
 *         500: 
 *           description: si ocurre un error en el servidor
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *               example:
 *                 status: 500
 *                 message: Ocurrio un error, intentelo mas tarde, o revisa tu conexion a internet 
 *          
 */
router.post('/Compras', verifyTokenCliente, compraValidator, CompraController.Comprar);

router.post('/desencryptar', CompraController.desencryptarTickets);

module.exports = router;