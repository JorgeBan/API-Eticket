const UserRepository = require('../repositories/UserRepository.js');
const UserControladorDTO = require('../dto/user/UserControladorDTO');
const CreateControladorEventoDto = require('../dto/user/createControladorEventoDTO');
const EventoRepository = require('../repositories/EventoRepository');
const HorarioRepository = require('../repositories/HorarioRepository');
const UbicacionRepository = require('../repositories/UbicacionRepository');

const EventoControladorDTO = require('../dto/evento/EventoControladorDTO');

class UserService {
    constructor() {
        this._userRepository = new UserRepository();
        this._eventoRepository = new EventoRepository();
        this._horarioRepository = new HorarioRepository();
        this._ubicacionRepository = new UbicacionRepository();
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

    async quitarControlador(idcontrolador, idubicacion, idhorario) {
        try {
            console.log(idcontrolador, idubicacion, idhorario);
            let respuesta = await this._userRepository.quitarControlador(idcontrolador, idubicacion, idhorario);
            if (respuesta === 0) throw { status: 404, message: 'informacion incorrecta' }
            return { message: 'Eliminado con exito' }
        } catch (e) {
            throw e;
        }
    }

    async getEventosControlador(idcontrolador) {
        try {
            let eventos = await this._userRepository.getEventosControlador(idcontrolador);
            let eventosDTO = [];
            for (let i = 0; i < eventos.length; i++) {
                let item = eventos[i];
                console.log(item.dataValues);
                let evento = await this._eventoRepository.getById(item.idevento);
                let ubicacion = await this._ubicacionRepository.getById(item.idubicacion);
                let horario = await this._horarioRepository.getById(item.idhorario);
                let { horaF, fechaF, horaFinal } = this._obtenerFechaHora(horario.dataValues.fecha_hora);
                if (new Date() <= horaFinal && evento.estado === 'Activo') {
                    let eventoDTO = new EventoControladorDTO(
                        evento.nombre,
                        ubicacion.idubicacion,
                        ubicacion.nombre,
                        horario.idhorario,
                        horaF,
                        fechaF
                    );
                    eventosDTO.push(eventoDTO);
                }
            }
            return eventosDTO;
        } catch (e) {
            throw e;
        }
    }

    _obtenerFechaHora(horario) {
        let hora = new Date(horario);
        let minutos = hora.getMinutes() + '';
        if (minutos.length === 1)
            minutos = minutos + '0';
        let horaF = hora.getHours() + ':' + minutos;
        let fechaF = hora.getDate() + '/' + (hora.getMonth() + 1) + '/' + hora.getFullYear();

        let horaFinal = new Date(horario);
        horaFinal.setHours(hora.getHours() + 4);
        return { horaF, fechaF, horaFinal };
    }

    async getControladoresEvento(idevento) {
        try {
            let controladores = await this._userRepository.getControladoresEvento(idevento);
            let controladoresDto = [];
            for (let i = 0; i < controladores.length; i++) {
                let item = controladores[i];
                let usuario = await this._userRepository.getControlador(item.idcontrolador);
                let ubicacion = await this._ubicacionRepository.getById(item.idubicacion);
                let horario = await this._horarioRepository.getById(item.idhorario);
                let controladorDTO = new UserControladorDTO(
                    usuario.idusuario,
                    usuario.nombre_usuario,
                    usuario.rol.nombre,
                    ubicacion.idubicacion,
                    ubicacion.nombre,
                    horario.idhorario,
                    horario.fecha_hora
                )
                controladoresDto.push(controladorDTO);
            }
            return controladoresDto;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserService;