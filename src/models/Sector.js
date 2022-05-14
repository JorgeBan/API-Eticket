const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Ubicacion = require('../models/Ubicacion');

const Sector = sequelize.define('sector', {
    idsector: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len:{
                args: [4, 255],
                msg: 'Name must be between 4 and 255 characters'
            }
        }
    },

    capacidad:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    referencia:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    
    idubicacion:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    capacidad_disponible:{
        type: Sequelize.INTEGER,
    } 

},{
    timestamps: false,
    freezeTableName: true,
});

Sector.belongsTo(Ubicacion, {foreignKey: 'idubicacion'});
Ubicacion.hasMany(Sector, {foreignKey: 'idubicacion'});
module.exports = Sector;