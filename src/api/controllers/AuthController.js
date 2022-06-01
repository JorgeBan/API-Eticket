const AuthServices = require('../../services/AuthServices');

async function login(req, res) {
    try {
        const authServices = new AuthServices();
        const user = await authServices.login(req.body.email, req.body.contrasena);
        res.status(200).header('authorization', 'Bearer ' + user.token).json(user);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}
async function register(req, res) {
    try {
        console.log("entro a register controller");
        const authServices = new AuthServices();
        const user = await authServices.register(req.body.nombre_usuario, req.body.email, req.body.contrasena, req.body.rol);
        res.status(201).header('authorization', 'Bearer ' + user.token).json(user);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

async function verifyCount(req, res) {
    try {
        console.log("entro a verifyCount");
        const authServices = new AuthServices();
        const user = await authServices.verifyCount(req.params.token);
        res.status(200).send("Su email ha sido verificado, ya puede iniciar sesion");
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

module.exports = {
    login,
    register,
    verifyCount
}
