const User = require('../models/User');
const Rol = require('../models/Rol');
const BaseRepository = require('../repositories/BaseRepository');
class UserRepository extends BaseRepository {
    constructor() {
        super(User);
        this._rol = Rol;
    }

    async getRoles() {
        try {
            let roles = await this._rol.findAll();
            return roles;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserRepository;