const AuthRepository = require('../repositories/AuthRepository');
const BaseService = require('./BaseServices');
const bycript = require('bcrypt');
const jwtConfig = require('../config/services/jwtConfig');
const UserDTO = require('../dto/user/UserDTO');
class AuthServices extends BaseService {
    constructor() {
        super(new AuthRepository());
        this.authRepository = new AuthRepository();
    }

    async login(email, contrasena) {
        try {
            console.log("email: ", email);
            console.log("contrasena: ", contrasena);
            const existsUser = await this.authRepository.getUserByEmail(email);
            if (existsUser) {
                if (this._isValidPassword(contrasena, existsUser.contrasena)) {
                    const rol = await this.authRepository.getRolByid(existsUser.idrol);
                    const token = jwtConfig.getToken({ idusuario: existsUser.idusuario, rol: rol.nombre });
                    const userDTO = new UserDTO(existsUser, rol.nombre, token);
                    return userDTO;
                }
                throw { status: 400, message: 'Contraseña incorrecta' };
            }
            throw { status: 400, message: 'El email no esta registrado' };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async register(nombre_usuario, email, contrasena, rol) {

        try {
            if (rol == undefined) throw { status: 400, message: 'El rol es requerido' };
            const existsUser = await this.authRepository.getUserByEmail(email);
            if (!existsUser) {
                const userRol = rol.toLowerCase().trim();
                const cryptPassword = await bycript.hash(contrasena, 10);
                const user = await this.authRepository.register(nombre_usuario, email, cryptPassword, userRol);
                const token = jwtConfig.getToken({ idusuario: user.idusuario, rol: userRol });
                const userDTO = new UserDTO(user, userRol, token);
                return userDTO;
            }
            throw { status: 400, message: 'El email ya esta registrado' };
        } catch (err) {
            throw err;
        }
    }

    _isValidPassword(password, passwordHash) {
        return bycript.compareSync(password, passwordHash);
    }
}

module.exports = AuthServices;


