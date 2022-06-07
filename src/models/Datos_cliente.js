const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const User = require('./User');

const Datos_cliente = sequelize.define('datos_cliente', {
    idcliente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombres: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefono: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    idusuario: {
        type: Sequelize.UUIDV4,
        allowNull: false,
    }

}, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

Datos_cliente.belongsTo(User, { foreignKey: 'idusuario' });
User.hasMany(Datos_cliente, { foreignKey: 'idusuario' });

module.exports = Datos_cliente;