const TicketService = require('../../services/TicketServices');
const jwtConfig = require('../../config/services/jwtConfig');
const ticketService = new TicketService();
async function infoTickets(req, res) {
    try {
        let token = req.headers['authorization'].split(' ')[1];

        // Si hay "", elimino el primer y ultimo caracter para sacar las ""
        let {codeTicket} = req.body;
        if (codeTicket.charAt(0)){
            codeTicket = codeTicket.substr(1, codeTicket.length - 2);
        }

        let tokenData = jwtConfig.getTokenData(token);
        console.log(req.body);
        let infoTickets = await ticketService.infoTickets(codeTicket, req.body.idubicacion, req.body.idhorario, tokenData.data.idusuario);
        res.json(infoTickets);
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json(err);
    }
}

async function registrarTicket(req, res) {
    try {
        let token = req.headers['authorization'].split(' ')[1];
        let tokenData = jwtConfig.getTokenData(token);
        let ticketRegistrado = await ticketService.registrarTicket(req.body.idticket, req.body.idubicacion, req.body.idhorario, tokenData.data.idusuario);
        res.json(ticketRegistrado);
    } catch (err) {
        res.status(err.status || 500).json(err);
    }
}

module.exports = {
    infoTickets,
    registrarTicket
};