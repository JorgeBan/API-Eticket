const { check } = require('express-validator');
const validateResult = require('../helpers/ValidateHelper');

const compraValidator = [
    check('DatosUsuario.nombres').exists().withMessage('El nombre es requerido').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('DatosUsuario.apellidos').exists().withMessage('El apellido es requerido').isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
    check('DatosUsuario.email').exists().withMessage('Se requiere el email para enviar los tickets').isEmail().withMessage('El email no es valido'),

    check('DatosCompra.idevento').exists().withMessage('Se requiere el id del evento'),
    check('DatosCompra.idubicacion').exists().withMessage('Se requiere el id de la ubicacion'),
    check('DatosCompra.idhorario').exists().withMessage('Se requiere el id del horario'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
    compraValidator
};