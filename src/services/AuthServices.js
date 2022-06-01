const AuthRepository = require('../repositories/AuthRepository');
const BaseService = require('./BaseServices');
const bycript = require('bcrypt');
const UserDTO = require('../dto/user/UserDTO');

const jwtConfig = require('../config/services/jwtConfig');
const mailConfig = require('../config/services/mailConfig');

class AuthServices extends BaseService {
    constructor() {
        super(new AuthRepository());
        this.authRepository = new AuthRepository();
    }

    async login(email, contrasena) {
        try {
            const existsUser = await this.authRepository.getUserByEmail(email);
            if (existsUser) {
                if (this._isValidPassword(contrasena, existsUser.contrasena)) {
                    const rol = await this.authRepository.getRolByid(existsUser.idrol);
                    const token = jwtConfig.getToken({ idusuario: existsUser.idusuario, rol: rol.nombre, estado: existsUser.estado });
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
                const token = jwtConfig.getToken({ idusuario: user.idusuario, rol: userRol, estado: user.estado });

                const template = mailConfig.getTemplate(nombre_usuario, token)

                mailConfig.sendMail(email, 'Confirmar cuenta', template)

                const userDTO = new UserDTO(user, userRol, token);
                return userDTO;
            }
            throw { status: 400, message: 'El email ya esta registrado' };
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    _isValidPassword(password, passwordHash) {
        return bycript.compareSync(password, passwordHash);
    }

    async verifyCount(token) {
        try {
            let data = jwtConfig.getTokenData(token);
            if (data === null || data === undefined)
                throw { status: 400, message: 'Token invalido' };

            const user = await this.authRepository.getUserById(data.data.idusuario);
            if (user === null || user === undefined)
                throw { status: 400, message: 'El usuario no existe' };

            const userUpdate = await this.authRepository.updateEstado(user.idusuario, "Verificado");
            return { status: 200, message: 'Cuenta verificada' };
        } catch (err) {
            console.log(err);
            throw err;
        }

    }
}

module.exports = AuthServices;


