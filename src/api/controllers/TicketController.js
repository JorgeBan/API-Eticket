const TicketService = require('../../services/TicketServices');
const ticketService = new TicketService();
async function infoTickets(req, res) {
    try {
        let infoTickets = await ticketService.infoTickets(req.body.codeTicket);
        res.json(infoTickets);
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json(err);
    }
}

module.exports = {
    infoTickets
};