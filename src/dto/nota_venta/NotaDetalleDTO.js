class NotaDetalleDTO {
    constructor(notaVenta, evento, tipoPago, detalles) {
        this.nroNota = notaVenta.nronota;
        this.fecha_emision = notaVenta.fecha_emision;
        this.precio_total = notaVenta.precio_total;
        this.evento = evento;
        this.tipoPago = tipoPago;
        this.detalles = detalles;
    }

    toJson() {
        return {
            nroNota: this.nroNota,
            fecha_emision: this.fecha_emision,
            precio_total: this.precio_total,
            evento: this.evento,
            tipoPago: this.tipoPago,
            detalles: this.detalles
        }
    }
}

module.exports = NotaDetalleDTO;