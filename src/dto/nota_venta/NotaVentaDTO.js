class NotaVentaDTO {
    constructor(notaVenta, evento, tipoPago) {
        this.nroNota = notaVenta.nronota;
        this.fecha_emision = notaVenta.fecha_emision;
        this.precio_total = notaVenta.precio_total;
        this.evento = evento;
        this.tipoPago = tipoPago;
    }

    toJson() {
        return {
            nroNota: this.nroNota,
            fecha_emision: this.fecha_emision,
            precio_total: this.precio_total,
            evento: this.evento,
            tipoPago: this.tipoPago
        }
    }
}

module.exports = NotaVentaDTO;