const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Categoria_evento = require('../models/Categoria_evento');

const Evento = sequelize.define('evento', {

    idevento: {   
        type: Sequelize.INTEGER,   
        autoIncrement: true,   
        allowNull: false,   
        primaryKey: true   
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len:{
                args: [4, 255],
                msg: 'Name must be between 4 and 255 characters'
            }
        }
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Inactivo',
    },


    
    descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    contacto:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    
    idcategoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true,
});


Evento.belongsTo(Categoria_evento, {foreignKey: 'idcategoria'});
Categoria_evento.hasMany(Evento, {foreignKey: 'idcategoria'});


module.exports = Evento;