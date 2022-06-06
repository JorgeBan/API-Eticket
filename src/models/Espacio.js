const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Sector = require('../models/Sector');

const Espacio = sequelize.define('espacio', {
    idespacio: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    identificador: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    tipo_de_espacio: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    cantidad_de_personas: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idsector: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    precio: {
        type: Sequelize.DECIMAL(6, 2),
        defaultValue: 0,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});
Espacio.belongsTo(Sector, { foreignKey: 'idsector' });
Sector.hasMany(Espacio, { foreignKey: 'idsector' });

module.exports = Espacio;