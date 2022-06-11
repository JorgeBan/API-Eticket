class DetalleVentaDTO {
    constructor(detalleVenta) {
        this.descripcion = detalleVenta.descripcion,
            this.cantidad = detalleVenta.cantidad,
            this.precio_unitario = detalleVenta.precio_unitario,
            this.importe = detalleVenta.importe
    }
    toJson() {
        return {
            descripcion: this.descripcion,
            cantidad: this.cantidad,
            precio_unitario: this.precio_unitario,
            importe: this.importe
        }
    }
}

module.exports = DetalleVentaDTO;