const UserRepository = require('../repositories/UserRepository.js');
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
}

module.exports = UserService;