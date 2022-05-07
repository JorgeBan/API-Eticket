const { check } = require('express-validator');
const validateResult = require('../helpers/ValidateHelper');

const validateCreate = [
    check('nombre')
    .exists().withMessage('El nombre es requerido')
    .isLength({ min: 4, max: 255 }).withMessage('El nombre debe tener entre 4 y 255 caracteres'),

    check('direccion')
    .exists().withMessage('La direccion es requerida'),

    check('latitud')
    .exists().withMessage('La latitud es requerida')
    .isDecimal().withMessage('La latitud debe ser un numero decimal'),

    check('longitud')
    .exists().withMessage('La longitud es requerida')
    .isDecimal().withMessage('La longitud debe ser un numero decimal'),

    check('cantidad_de_personas')
    .exists().withMessage('La cantidad de personas es requerida')
    .isNumeric().withMessage('La cantidad de personas debe ser un numero'),

    check('idevento')
    .exists().withMessage('El identificador de evento es requerido')
    .isNumeric().withMessage('El identificador de evento debe ser un numero'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    validateCreate,
}