const UserRepository = require('../repositories/UserRepository.js');
const UserControladorDTO = require('../dto/user/UserControladorDTO');
const CreateControladorEventoDto = require('../dto/user/createControladorEventoDTO');
const EventoRepository = require('../repositories/EventoRepository');
const HorarioRepository = require('../repositories/HorarioRepository');
class UserService {
    constructor() {
        this._userRepository = new UserRepository();
        this._eventoRepository = new EventoRepository();
        this._horarioRepository = new HorarioRepository();
    }

    async getRoles() {
        try {
            let roles = await this._userRepository.getRoles();
            return roles;
        } catch (e) {
            throw e;
        }
    }

    async getAllControlador() {
        try {
            let constroladores = await this._userRepository.getAllControlador();
            let listaControladores = [];
            for (let i = 0; i < constroladores.length; i++) {
                let item = constroladores[i];
                let controlador = new UserControladorDTO(
                    item.idusuario,
                    item.nombre_usuario,
                    item.rol.nombre
                );
                listaControladores.push(controlador);
            }
            return listaControladores;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async verifyTokenControlador(tokenData) {
        try {
            console.log('tokenData', tokenData);
            if (tokenData.rol !== 'controlador') throw { status: 401, message: 'Usuario no valido' };
            return { message: 'usuario valido' };
        } catch (e) {
            throw e;
        }
    }

    async asignarControlador(idcontrolador, idevento, idubicacion, idhorario) {
        try {

            let controlador = await this._userRepository.getControlador(idcontrolador);
            let evento = await this._eventoRepository.getById(idevento);

            let horario = await this._horarioRepository.getHorarioByUbicacion(idhorario, idubicacion);
            if (!horario || !evento) throw { status: 400, message: 'Los datos incorrectos o el usuario ya ha sido asignado al evento' };
            if (evento.estado !== 'Activo') throw { status: 400, message: 'El evento debe estar activo para asignar control' };
            if (!controlador) throw { status: 400, message: 'solo se puede asignar a usuarios controladores' }

            let createControladorEventoDTO = new CreateControladorEventoDto(
                idcontrolador, idevento, idubicacion, idhorario
            );
            let asignado = await this._userRepository.asignarEvento(createControladorEventoDTO);

            return asignado;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserService;