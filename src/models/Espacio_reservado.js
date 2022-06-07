const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Espacio = require('./Espacio');
const Horario = require('./Horario');


const Espacio_reservado = sequelize.define('espacio_reservado', {
    idhorario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    idespacio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});

Espacio_reservado.belongsTo(Espacio, { foreignKey: 'idespacio' });
Espacio.hasMany(Espacio_reservado, { foreignKey: 'idespacio' });

Espacio_reservado.belongsTo(Horario, { foreignKey: 'idhorario' });
Horario.hasMany(Espacio_reservado, { foreignKey: 'idhorario' });

module.exports = Espacio_reservado;