class SectorReporteDTO {
    constructor(horario, cantidadTotal, cantidadVendidas, cantidadEntradasUsadas, entradasVendidas) {
        this.horario = horario;
        this.cantidadEntradasTotal = cantidadTotal;
        this.cantidadEntradasVendidas = cantidadVendidas;
        this.cantidadEntradasUsadas = cantidadEntradasUsadas;
        this.entradasVendidas = entradasVendidas;
    }
}
module.exports = SectorReporteDTO;