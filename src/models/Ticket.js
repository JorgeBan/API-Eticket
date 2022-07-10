const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Horario = require('./Horario');
const Ubicacion = require('./Ubicacion');
const Sector = require('./Sector');
const Espacio = require('./Espacio');
const Detalle_venta = require('./Detalle_venta');
const Usuario = require('./User');
const Ticket = sequelize.define('ticket', {
    idticket: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    idhorario: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idubicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idsector: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    idespacio: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    nrodetalle: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idusuario: {
        type: Sequelize.UUIDV4,
        allowNull: false,
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'disponible'
    },
}, {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

Ticket.belongsTo(Horario, { foreignKey: 'idhorario' });
Ticket.hasMany(Horario, { foreignKey: 'idhorario' });

Ticket.belongsTo(Ubicacion, { foreignKey: 'idubicacion' });
Ticket.hasMany(Ubicacion, { foreignKey: 'idubicacion' });

Ticket.belongsTo(Sector, { foreignKey: 'idsector' });
Ticket.hasMany(Sector, { foreignKey: 'idsector' });

Ticket.belongsTo(Espacio, { foreignKey: 'idespacio' });
Ticket.hasMany(Espacio, { foreignKey: 'idespacio' });

Ticket.belongsTo(Detalle_venta, { foreignKey: 'nrodetalle' });
Detalle_venta.hasMany(Ticket, { foreignKey: 'nrodetalle' });

Ticket.belongsTo(Usuario, { foreignKey: 'idusuario' });
Usuario.hasMany(Usuario, { foreignKey: 'idusuario' });
module.exports = Ticket;