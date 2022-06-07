const CompraService = require('../../services/CompraServices');
const compraService = new CompraService();
const jwtConfig = require('../../config/services/jwtConfig');
async function Comprar(req, res) {
    try {
        //console.log(req.body);
        console.log("entre al controler");
        let token = req.headers['authorization'].split(' ')[1];
        let tokenData = jwtConfig.getTokenData(token);
        console.log("token", tokenData.data.idusuario);
        const result = await compraService.Comprar(req.body.DatosUsuario, req.body.DatosCompra, tokenData.data.idusuario);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
}

module.exports = {
    Comprar
}