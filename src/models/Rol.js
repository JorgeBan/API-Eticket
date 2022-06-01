const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const User = require('../models/User');

const Rol = sequelize.define('rol', {
    idrol: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            length: {
                args: [4, 50],
                msg: "El nombre del rol debe tener entre 4 y 50 caracteres"
            }
        }
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    timestamps: false,
    freezeTableName: true
});


module.exports = Rol;