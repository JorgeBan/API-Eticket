const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Ubicacion = require('../models/Ubicacion');
const Horario = require('../models/Horario');
const Entradas_ubicacion = sequelize.define('entradas_ubicacion', {
    idcantidad: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    idhorario: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    idubicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cantidad_vendida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }

}, {
    timestamps: false,
    freezeTableName: true,
});

Entradas_ubicacion.belongsTo(Ubicacion, { foreignKey: 'idubicacion' });
Ubicacion.hasMany(Entradas_ubicacion, { foreignKey: 'idubicacion' });

Entradas_ubicacion.belongsTo(Horario, { foreignKey: 'idhorario' });
Horario.belongsTo(Entradas_ubicacion, { foreignKey: 'idhorario' });

module.exports = Entradas_ubicacion;