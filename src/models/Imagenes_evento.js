const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Evento = require('../models/Evento');

const Imagenes_evento = sequelize.define('imagenes_evento', {
    idimagenevento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nombre:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    url:{
        type: Sequelize.STRING,
        allowNull: false,
       
    },
    idevento:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true,
});

Imagenes_evento.belongsTo(Evento, {foreignKey: 'idevento'});
Evento.hasMany(Imagenes_evento, {foreignKey: 'idevento'});

module.exports = Imagenes_evento;