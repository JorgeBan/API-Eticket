const UserService = require('../../services/UserServices.js');
const jwtConfig = require('../../config/services/jwtConfig');
const _userService = new UserService();
async function getRoles(req, res) {
    try {
        let roles = await _userService.getRoles();
        res.status(200).json(roles);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function getAllControlador(req, res) {
    try {
        let constroladores = await _userService.getAllControlador();
        res.status(200).json(constroladores);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function verifyTokenControlador(req, res) {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        let tokenData = jwtConfig.getTokenData(token);
        let response = await _userService.verifyTokenControlador(tokenData.data);
        res.status(200).json(response);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function asignarControlador(req, res) {
    try {
        let controladorAsignado = await _userService.asignarControlador(req.body.idcontrolador, req.body.idevento, req.body.idubicacion, req.body.idhorario);
        res.status(200).json(controladorAsignado);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}


async function getEventosControlador(req, res) {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        let tokenData = jwtConfig.getTokenData(token);
        let eventos = await _userService.getEventosControlador(tokenData.data.idusuario);
        res.status(200).json(eventos);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}


async function getControladoresEvento(req, res) {
    try {
        let controladores = await _userService.getControladoresEvento(req.params.idevento);
        res.status(200).json(controladores);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function quitarControlador(req, res) {
    try {
        let resp = await _userService.quitarControlador(req.params.idcontrolador, req.params.idubicacion, req.params.idhorario);
        res.status(200).json(resp);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
}

module.exports = {
    getRoles,
    getAllControlador,
    verifyTokenControlador,
    asignarControlador,
    getEventosControlador,
    getControladoresEvento,
    quitarControlador
}