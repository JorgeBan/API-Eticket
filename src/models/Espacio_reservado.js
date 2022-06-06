const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Espacio = require('./Espacio');
const Horario = require('./Horario');


const Espacio_reservado = sequelize.define('espacio_reservado', {
    idreserva: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    idhorario: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idespacio: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

Espacio_reservado.belongsTo(Espacio, { foreignKey: 'idespacio' });
Espacio.hasMany(Espacio_reservado, { foreignKey: 'idespacio' });

Espacio_reservado.belongsTo(Horario, { foreignKey: 'idhorario' });
Horario.hasMany(Espacio_reservado, { foreignKey: 'idhorario' });

module.exports = Espacio_reservado;