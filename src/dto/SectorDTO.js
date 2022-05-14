class SectorDTO{
    constructor(sector){
        this.nombre = sector.nombre;
        this.capacidad = sector.capacidad;
        this.referencia = sector.referencia;
        this.idubicacion = sector.idubicacion;
        this.capacidad_disponible = sector.capacidad;
    }

    toJSON(){
        return {
            nombre: this.nombre,
            capacidad: this.capacidad,
            referencia: this.referencia,
            idubicacion: this.idubicacion,
            capacidad_disponible: this.capacidad_disponible
        }
    }
}

module.exports = SectorDTO;