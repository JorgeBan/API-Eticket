const {check} = require('express-validator');
const validateResult = require('../helpers/ValidateHelper');

const validateCreate = [
    check('fecha_hora').exists().withMessage('La fecha y hora es requerida'),
    check('idubicacion').exists().withMessage('La ubicacion es requerida'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
    validateCreate
};