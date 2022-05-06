const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Ubicacion = require('../models/Ubicacion');

const Horario = sequelize.define('horario', {
    idhorario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    fecha_hora: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    idubicacion:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true,
});

Horario.belongsTo(Ubicacion, {foreignKey: 'idubicacion'});
Ubicacion.hasMany(Horario, {foreignKey: 'idubicacion'});

module.exports = Horario;