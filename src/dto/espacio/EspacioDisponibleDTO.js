class espaciosDiponibleDTO {
    constructor(espacio) {
        this.idespacio = espacio.idespacio;
        this.identificador = espacio.identificador;
        this.tipo_de_espacio = espacio.tipo_de_espacio;
        this.cantidad_de_personas = espacio.cantidad_de_personas;
        this.idsector = espacio.idsector;
        this.precio = espacio.precio;
    }
    toJSON() {
        return {
            idespacio: this.idespacio,
            identificador: this.identificador,
            tipo_de_espacio: this.tipo_de_espacio,
            cantidad_de_personas: this.cantidad_de_personas,
            idsector: this.idsector,
            precio: this.precio
        }
    }
}
module.exports = espaciosDiponibleDTO;