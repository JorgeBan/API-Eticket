//Middleware for verifying the token
const jwtConfig = require('../config/services/jwtConfig');
const verifyTokenCliente = (req, res, next) => {
    const header = req.headers['authorization'];
    if (header === undefined)
        return res.status(401).json({ status: 401, message: 'No autorizado, necesita token de autorizacion' });

    let token = req.headers['authorization'].split(' ')[1];
    try {
        let tokenData = jwtConfig.getTokenData(token);
        console.log(tokenData);
        if (tokenData.data.idusuario === undefined || tokenData.data.rol === undefined)
            return res.status(401).json({ status: 401, message: 'NO Autorizado, token invalido' });

        if (tokenData.data.rol != 'cliente')
            return res.status(403).json({ status: 403, message: 'NO Autorizado, solo los clientes pueden acceder a esta ruta' });
        next();
    } catch (err) {
        return res.status(err.status || 500).json(err);
    }
}

module.exports = {
    verifyTokenCliente
}