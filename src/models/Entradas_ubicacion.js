const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Ubicacion = require('../models/Ubicacion');
const Horario = require('../models/Horario');
const Entradas_ubicacion = sequelize.define('entradas_ubicacion', {
    idhorario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },

    idubicacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    cantidad_vendida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }

}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});

Entradas_ubicacion.belongsTo(Ubicacion, { foreignKey: 'idubicacion' });
Ubicacion.hasMany(Entradas_ubicacion, { foreignKey: 'idubicacion' });

Entradas_ubicacion.belongsTo(Horario, { foreignKey: 'idhorario' });
Horario.belongsTo(Entradas_ubicacion, { foreignKey: 'idhorario' });

module.exports = Entradas_ubicacion;