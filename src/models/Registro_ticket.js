const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Registro_ticket = sequelize.define('registro_ticket',
    {
        idticket: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        idcontrolador: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        hora_registro: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    });


Registro_ticket.belongsTo(Ticket, { foreignKey: 'idticket' });
Ticket.belongsTo(Registro_ticket, { foreignKey: 'idticket' });

Registro_ticket.belongsTo(User, { foreignKey: 'idcontrolador' });
User.hasMany(Registro_ticket, { foreignKey: 'idcontrolador' });

module.exports = Registro_ticket;