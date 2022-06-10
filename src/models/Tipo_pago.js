const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');

const Tipo_pago = sequelize.define('tipo_pago', {
    idpago: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

module.exports = Tipo_pago;