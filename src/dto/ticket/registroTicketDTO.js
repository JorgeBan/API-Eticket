class registroTicketDTO {
    constructor(idticket, idcontrolador, idubicacion, idhorario) {
        this.idticket = idticket;
        this.idcontrolador = idcontrolador;
        this.idubicacion = idubicacion;
        this.idhorario = idhorario;
        this.hora_registro = new Date();
    };
}

module.exports = registroTicketDTO;