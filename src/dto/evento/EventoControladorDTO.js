class EventoControladorDTO {
    constructor(evento, idubicacion, ubicacion, idhorario, hora, fecha) {
        this.evento = evento;
        this.idubicacion = idubicacion;
        this.ubicacion = ubicacion;
        this.idhorario = idhorario;
        this.hora = hora;
        this.fecha = fecha;
    }
}

module.exports = EventoControladorDTO;