const { check } = require('express-validator');
const validateResult = require('../helpers/ValidateHelper');

const validateCreate = [

    check('identificador').exists().withMessage('El identificador es requerido'),
    check('tipo_de_espacio').exists().withMessage('El tipo de espacio es requerido'),
    check('cantidad_de_personas').exists().withMessage('La cantidad de personas es requerida').isInt().withMessage('La cantidad de personas debe ser un numero entero'),
    check('idsector').exists().withMessage('El sector es requerido'),
    check('precio').exists().withMessage('El precio es requerido').isDecimal().withMessage('El precio debe ser un numero decimal'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
    validateCreate
};