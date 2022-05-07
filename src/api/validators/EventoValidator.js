const { check } = require('express-validator');
const validateResult = require('../helpers/ValidateHelper');

const validateCreate = [
    check('nombre')
    .exists().withMessage('El nombre es requerido')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 4, max: 255 }).withMessage('El nombre debe tener entre 4 y 255 caracteres'),

    
    check('idcategoria').
    exists().withMessage('La categoria es requerida')
    .notEmpty().withMessage('La categoria es requerida')   
    .isNumeric().withMessage('El identificador debe ser un numerico'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    validateCreate,
}