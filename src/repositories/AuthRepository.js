const sequelize = require('../config/database/database');
const User = require('../models/User');
const Rol = require('../models/Rol');
const BaseRepository = require('../repositories/BaseRepository');
const UserDTO = require('../dto/user/UserDTO');
class AuthRepository extends BaseRepository {
    constructor() {
        super(User);
        this.rolModel = Rol;
    }

    async getUserById(id) {
        try {
            let user = await this.model.findByPk(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        console.log("entro a getUserByEmail");
        try {
            let user = await this.model.findOne({
                where: {
                    email: email
                }
            });
            return user;
        } catch (error) {
            console.log("error en getuser", error);
            throw error;
        }
    }

    async login(email, password) {
        let user = await this.model.findOne({
            where: {
                email: email,
                password: password
            }
        });
        return user;
    }

    async getRolByid(id) {
        try {
            let rol = await this.rolModel.findByPk(id);
            return rol;
        } catch (error) {
            throw error;
        }
    }

    async register(name, email, password, rol) {
        console.log("entro a register");
        const t = await sequelize.transaction();
        try {
            const userRole = await this.rolModel.findOne({
                where: {
                    nombre: rol
                }
            }, { transaction: t });
            if (userRole) {
                const user = await this.model.create({
                    nombre_usuario: name,
                    email: email,
                    contrasena: password,
                    idrol: userRole.idrol,
                    
                }, { transaction: t });
                await t.commit();
                return user;
            }
            throw { status: 400, message: 'El rol no existe' };

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async updateEstado(id, estado) {
        try {
            let user = await this.model.update({
                estado: estado
            }, {
                where: {
                    idusuario: id
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthRepository;


