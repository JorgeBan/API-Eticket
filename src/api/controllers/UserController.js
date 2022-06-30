const UserService = require('../../services/UserServices.js');
const jwtConfig = require('../../config/services/jwtConfig');
const _userService = new UserService();
async function getRoles(req, res) {
    try {
        let roles = await _userService.getRoles();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500 || err.status).json(err);
    }
}

async function getAllControlador(req, res) {
    try {
        let constroladores = await _userService.getAllControlador();
        res.status(200).json(constroladores);
    } catch (err) {
        res.status(500 || err.status).json(err);
    }
}

async function verifyTokenControlador(req, res) {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        let tokenData = jwtConfig.getTokenData(token);
        let response = await _userService.verifyTokenControlador(tokenData.data);
        res.status(200).json(response);
    } catch (err) {
        res.status(500 || err.status).json(err);
    }
}

module.exports = {
    getRoles,
    getAllControlador,
    verifyTokenControlador
}