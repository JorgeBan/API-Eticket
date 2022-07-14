class ReporteDTO {
    constructor(evento, ubicacion, vendidas) {
        this.evento = evento;
        this.ubicacion = ubicacion;
        this.entradas_vendidas = vendidas;
    }
}
module.exports = ReporteDTO