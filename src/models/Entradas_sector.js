const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Sector = require('../models/Sector');
const Horario = require('../models/Horario');


const Entradas_sector = sequelize.define('entradas_sector', {
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
    idsector: {
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

Entradas_sector.belongsTo(Sector, { foreignKey: 'idsector' });
Sector.hasMany(Entradas_sector, { foreignKey: 'idsector' });

Entradas_sector.belongsTo(Horario, { foreignKey: 'idhorario' });
Horario.hasMany(Entradas_sector, { foreignKey: 'idhorario' });

module.exports = Entradas_sector;