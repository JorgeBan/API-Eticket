//Middleware for verifying the token
const jwtConfig = require('../config/services/jwtConfig');
const verifyTokenCliente = (req, res, next) => {
    const header = req.headers['authorization'];
    if (header === undefined)
        return res.status(401).json({ status: 401, message: 'Debe iniciar sesion' });

    let token = req.headers['authorization'].split(' ')[1];
    try {
        let tokenData = jwtConfig.getTokenData(token);

        if (tokenData.data === undefined) throw { status: 401, message: 'Debe iniciar sesion' };
        if (tokenData.data.idusuario === undefined || tokenData.data.rol === undefined || tokenData.data.estado === undefined)
            return res.status(401).json({ status: 401, message: 'Debe iniciar sesion' });

        if (tokenData.data.rol != 'cliente')
            return res.status(403).json({ status: 403, message: 'NO Autorizado, solo los clientes pueden acceder a esta ruta' });

        if (tokenData.data.estado != 'Verificado')
            return res.status(403).json({ status: 403, message: 'Debe confirmar su email y luego intentar iniciar sesion nuevamente' });
        next();
    } catch (err) {
        console.log(err);
        return res.status(err.status || 500).json(err);
    }
}
const verifyTokenAdmin = (req, res, next) => {
    const header = req.headers['authorization'];
    if (header === undefined)
        return res.status(401).json({ status: 401, message: 'Debe iniciar sesion' });

    let token = req.headers['authorization'].split(' ')[1];
    try {
        let tokenData = jwtConfig.getTokenData(token);

        if (tokenData.data === undefined) throw { status: 401, message: 'Debe iniciar sesion' };
        if (tokenData.data.idusuario === undefined || tokenData.data.rol === undefined || tokenData.data.estado === undefined)
            return res.status(401).json({ status: 401, message: 'Debe iniciar sesion' });

        if (tokenData.data.rol != 'admin')
            return res.status(403).json({ status: 403, message: 'NO Autorizado, solo los administradores pueden acceder a esta ruta' });

        if (tokenData.data.estado != 'Verificado')
            return res.status(403).json({ status: 403, message: 'Debe confirmar su email y luego intentar iniciar sesion nuevamente' });
        next();
    } catch (err) {
        console.log(err);
        return res.status(err.status || 500).json(err);
    }
}

const verifyTokenControlador = (req, res, next) => {
    const header = req.headers['authorization'];
    if (header === undefined)
        return res.status(401).json({ status: 401, message: 'Debe iniciar sesion' });

    let token = req.headers['authorization'].split(' ')[1];
    try {
        let tokenData = jwtConfig.getTokenData(token);

        if (tokenData.data === undefined) throw { status: 401, message: 'Debe iniciar sesion' };
        if (tokenData.data.idusuario === undefined || tokenData.data.rol === undefined || tokenData.data.estado === undefined)
            return res.status(401).json({ status: 401, message: 'Debe iniciar sesion' });

        if (tokenData.data.rol != 'controlador')
            return res.status(403).json({ status: 403, message: 'Cuenta invalida' });

        if (tokenData.data.estado != 'Verificado')
            return res.status(403).json({ status: 403, message: 'Debe confirmar su email y luego intentar iniciar sesion nuevamente' });
        next();
    } catch (err) {
        console.log(err);
        return res.status(err.status || 500).json(err);
    }
}


module.exports = {
    verifyTokenCliente,
    verifyTokenAdmin,
    verifyTokenControlador
}