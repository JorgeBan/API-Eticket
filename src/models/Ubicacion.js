const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Evento = require('../models/Evento');

const Ubicacion = sequelize.define('ubicacion', {
    idubicacion: {
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

    direccion:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len:{
                args: [10, 255],
                msg: 'Address must be between 10 and 255 characters'
            }
        }
    },

    
    latitud:{
        type: Sequelize.DECIMAL(10,8),
        allowNull: false,
    },

    longitud:{
        type: Sequelize.DECIMAL(10,8),
        allowNull: false,
    },

    cantidad_de_personas:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
    idevento:{
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

Ubicacion.belongsTo(Evento, {foreignKey: 'idevento'});
Evento.hasMany(Ubicacion, {foreignKey: 'idevento'});


module.exports = Ubicacion; 