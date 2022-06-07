const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const User = require('./User');
const Datos_cliente = require('./Datos_cliente');
const Tipo_pago = require('./Tipo_pago');
const Evento = require('./Evento');
const Nota_venta = sequelize.define('nota_venta', {
    nronota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    fecha_emision: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    precio_total: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
    },
    idusuario: {
        type: Sequelize.UUIDV4,
        allowNull: false,

    },
    idcliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idpago: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idevento: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }


}, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

Nota_venta.belongsTo(User, { foreignKey: 'idusuario' });
User.hasMany(Nota_venta, { foreignKey: 'idusuario' });

Nota_venta.belongsTo(Datos_cliente, { foreignKey: 'idcliente' });
Datos_cliente.belongsTo(Nota_venta, { foreignKey: 'idcliente' });

Nota_venta.belongsTo(Tipo_pago, { foreignKey: 'idpago' });
Tipo_pago.hasMany(Nota_venta, { foreignKey: 'idpago' });

Nota_venta.belongsTo(Evento, { foreignKey: 'idevento' });
Evento.hasMany(Nota_venta, { foreignKey: 'idevento' });

module.exports = Nota_venta;