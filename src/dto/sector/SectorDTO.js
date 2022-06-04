class SectorDTO {
    constructor(sector) {
        this.idsector = sector.idsector;
        this.nombre = sector.nombre;
        this.referencia = sector.referencia;
        this.idubicacion = sector.idubicacion;
        this.precio = sector.precio;

    }
    toJSON() {
        return {
            idsector: this.idsector,
            nombre: this.nombre,
            referencia: this.referencia,
            idubicacion: this.idubicacion,
            precio: this.precio
        }
    }
}

module.exports = SectorDTO;