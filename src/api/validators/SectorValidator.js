const {check} = require('express-validator');
const validateResult = require('../helpers/ValidateHelper');

const validateCreate = [
    check('nombre').exists().withMessage('El nombre es requerido'),
    check('capacidad').exists().withMessage('La capacidad es requerida')
    .isInt().withMessage('La capacidad debe ser un numero entero'),
    check('idubicacion').exists().withMessage('La ubicacion es requerida'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
    validateCreate
};