const { check } = require('express-validator');
const validateResult = require('../helpers/ValidateHelper');

const loginValidator = [
    check('email')
        .exists().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser un email valido'),

    check('contrasena')
        .exists().withMessage('La contraseña es requerida')
        .isString().withMessage('La contraseña debe ser un string'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const registerValidator = [
    check('nombre_usuario')
        .exists().withMessage('El nombre es requerido')
        .isLength({ min: 4, max: 255 }).withMessage('El nombre debe tener entre 4 y 255 caracteres'),

    check('email')
        .exists().withMessage('El email es requerido')
        .isEmail().withMessage('El email debe ser un email valido'),

    check('contrasena')
        .exists().withMessage('La contraseña es requerida')
        .isLength({ min: 4, max: 255 }).withMessage('La contraseña debe tener entre 5 y 255 caracteres'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    loginValidator,
    registerValidator
}

