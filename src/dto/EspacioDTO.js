class EspacioDTO{
    constructor(espacio){
        this._identificador = espacio.identificador;
        this._tipo_de_espacio = espacio.tipo_de_espacio;
        this._cantidad_de_personas = espacio.cantidad_de_personas;
        this._idsector = espacio.idsector;
    }

    toJSON(){
        return {
            identificador: this._identificador,
            tipo_de_espacio: this._tipo_de_espacio,
            cantidad_de_personas: this._cantidad_de_personas,
            idsector: this._idsector
        }
    }
}

module.exports = EspacioDTO;