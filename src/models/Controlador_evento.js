const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Evento = require('../models/Evento');
const Ubicacion = require('../models/Ubicacion');
const Horario = require('../models/Horario');
const User = require('../models/User');
const Controlador_evento = sequelize.define('controlador_evento',
    {
        idcontrolador: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        idevento: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        idubicacion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        idhorario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        timestamp: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true

    }
);
Controlador_evento.belongsTo(User, { foreignKey: 'idcontrolador' });
Controlador_evento.belongsTo(Evento, { foreignKey: 'idevento' });
Controlador_evento.belongsTo(Ubicacion, { foreignKey: 'idubicacion' });
Controlador_evento.belongsTo(Horario, { foreignKey: 'idhorario' });


User.hasMany(Controlador_evento, { foreignKey: 'idcontrolador' });
Evento.hasMany(Controlador_evento, { foreignKey: 'idevento' });
Horario.hasMany(Controlador_evento, { foreignKey: 'idhorario' });
Ubicacion.hasMany(Controlador_evento, { foreignKey: 'idubicacion' });

module.exports = Controlador_evento;
