const {check} = require('express-validator');
const validateResult = require('../helpers/ValidateHelper');

const validateCreate = [
    check('fecha_hora').exists().withMessage('La fecha y hora es requerida')
    .custom(value => {
        let fecha = new Date(value);
        let hoy = new Date();
        if(fecha < hoy){
            throw new Error('La fecha y hora no es valida, Debe ingresar una fecha y hora mayor a la actual');
        }
        return true;
    }),
    check('idubicacion').exists().withMessage('La ubicacion es requerida'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    validateCreate
};