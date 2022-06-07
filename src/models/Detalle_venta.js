const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Nota_venta = require('./Nota_venta');
const Detalle_venta = sequelize.define('detalle_venta', {
    nrodetalle: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    precio_unitario: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
    },
    importe: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
    },
    nronota: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

}, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

Detalle_venta.belongsTo(Nota_venta, { foreignKey: 'nronota' });
Nota_venta.hasMany(Detalle_venta, { foreignKey: 'nronota' });
module.exports = Detalle_venta;

