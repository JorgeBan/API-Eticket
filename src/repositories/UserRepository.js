const User = require('../models/User');
const Rol = require('../models/Rol');
const Controlador_evento = require('../models/Controlador_evento');
const BaseRepository = require('../repositories/BaseRepository');
class UserRepository extends BaseRepository {
    constructor() {
        super(User);
        this._rol = Rol;
        this._controlador_evento = Controlador_evento
    }

    async getRoles() {
        try {
            let roles = await this._rol.findAll();
            return roles;
        } catch (e) {
            throw e;
        }
    }

    async getAllControlador() {
        try {
            let constroladores = await this.model.findAll({
                include: {
                    model: Rol,
                    where: {
                        nombre: 'controlador'
                    }
                },
                where: {
                    estado: 'Verificado'
                }
            });
            return constroladores;
        } catch (e) {
            throw e;
        }
    }

    async getControlador(id) {
        try {
            let controlador = await this.model.findByPk(id, {
                include: {
                    model: Rol,
                    where: {
                        nombre: 'controlador'
                    }
                },
            });
            return controlador;
        } catch (e) {
            throw e;
        }
    }

    async asignarEvento(asignar) {
        try {
            let asignado = await this._controlador_evento.create(asignar);
            return asignado;
        } catch (e) {
            throw { status: 400, message: 'Los datos son incorrectos o el usuario ya ha sido asignado al evento' };
        }
    }
}

module.exports = UserRepository;