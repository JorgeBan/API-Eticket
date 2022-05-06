const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');

const Categoria_evento = sequelize.define('categoria_evento', {

    idcategoria: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        allowNull: false, 
        primaryKey: true 
    },
    
    nombre: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: {
            msg: 'El nombre de la categoria ya existe'
        },
        validate: {
            len:{
                args: [4, 255],
                msg: 'El nombre debe tener entre 4 y 255 caracteres'
            }
        }     
    },
    
    descripcion: { 
        type: Sequelize.STRING, 
        allowNull: true 
    },
},{
    timestamps: false,
    freezeTableName: true,

});

module.exports = Categoria_evento;