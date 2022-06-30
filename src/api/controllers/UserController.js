const UserService = require('../../services/UserServices.js');
const _userService = new UserService();
async function getRoles(req, res) {
    try {
        let roles = await _userService.getRoles();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500 || err.status).json(err);
    }
}

module.exports = {
    getRoles,
}