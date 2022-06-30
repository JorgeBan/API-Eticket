class registroTicketDTO {
    constructor(idticket, idcontrolador) {
        this.idticket = idticket;
        this.idcontrolador = idcontrolador;
        this.hora_registro = new Date();
    };
}

module.exports = registroTicketDTO;