class EspacioDTO {
    constructor(espacio) {
        this._identificador = espacio.identificador;
        this._tipo_de_espacio = espacio.tipo_de_espacio;
        this._cantidad_de_personas = espacio.cantidad_de_personas;
        this._idsector = espacio.idsector;

        this._precio = espacio.precio;
    }

    toJSON() {
        return {
            identificador: this._identificador,
            tipo_de_espacio: this._tipo_de_espacio,
            cantidad_de_personas: this._cantidad_de_personas,
            idsector: this._idsector,
            precio: this._precio
        }
    }
}

module.exports = EspacioDTO;