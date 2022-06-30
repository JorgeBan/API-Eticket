const UserRepository = require('../repositories/UserRepository.js');
const UserControladorDTO = require('../dto/user/UserControladorDTO');
class UserService {
    constructor() {
        this._userRepository = new UserRepository();
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
}

module.exports = UserService;