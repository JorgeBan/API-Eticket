class InfoTicketDTO {
    constructor(ticket, evento, fecha, hora, ubicacion, sector, espacio, usuario, estado) {
        this.evento = evento;
        this.hora = hora;
        this.fecha = fecha;
        this.ubicacion = ubicacion;
        this.sector = sector;
        this.espacio = espacio;
        this.ticket = ticket;
        this.usuario = usuario.nombre_usuario;
        this.email = usuario.email;
        this.estado = estado;
    }

    toJSON() {
        return {
            ticket: this.ticket,
            evento: this.evento,
            fecha: this.fecha,
            hora: this.hora,
            ubicacion: this.ubicacion,
            sector: this.sector,
            espacio: this.espacio,
            usuario: this.usuario,
            email: this.email,
            estado: this.estado
        }
    }
}
module.exports = InfoTicketDTO