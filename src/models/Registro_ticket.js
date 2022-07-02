const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

const Ubicacion = require('../models/Ubicacion');
const Horario = require('../models/Horario');
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

        idubicacion: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        idhorario: {
            type: Sequelize.INTEGER,
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

Registro_ticket.belongsTo(Ubicacion, { foreignKey: 'idubicacion' });
Ubicacion.hasMany(Registro_ticket, { foreignKey: 'idubicacion' });

Registro_ticket.belongsTo(Horario, { foreignKey: 'idhorario' });
Horario.hasMany(Registro_ticket, { foreignKey: 'idhorario' });



module.exports = Registro_ticket;