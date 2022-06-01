const Sequelize = require('sequelize');
const sequelize = require('../config/database/database');
const Rol = require('../models/Rol');
const User = sequelize.define('users', {
    idusuario: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 50],
                msg: "El nombre de usuario debe tener entre 4 y 50 caracteres"
            }
        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "El email ya está en uso"
        },
        validate: {
            isEmail: {
                msg: "El email no es válido"
            }
        }
    },

    contrasena: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    estado: {
        type: Sequelize.STRING,
        defaultValue: 'No Verificado'
    },
    idrol: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

User.belongsTo(Rol, { foreignKey: 'idrol' });
Rol.hasMany(User, { foreignKey: 'idrol' });

module.exports = User;