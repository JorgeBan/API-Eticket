class UbicacionDTO {
    constructor(Ubicacion) {
        this._nombre = Ubicacion.nombre;
        this._direccion = Ubicacion.direccion;
        this._latitud = Ubicacion.latitud;
        this._longitud = Ubicacion.longitud;
        this._cantidad_de_personas = Ubicacion.cantidad_de_personas;
        this._idevento = Ubicacion.idevento;
        this._capacidad_disponible = Ubicacion.cantidad_de_personas;
        /*
                this._entradas = Ubicacion.cantidad_de_personas
                this._precios = Ubicacion.precio || 0;*/
    }

    toJSON() {
        return {
            nombre: this._nombre,
            direccion: this._direccion,
            latitud: this._latitud,
            longitud: this._longitud,
            cantidad_de_personas: this._cantidad_de_personas,
            idevento: this._idevento,
            capacidad_disponible: this._capacidad_disponible,
            precio: this._precios,
            entradas: this._entradas
        }
    }
}

module.exports = UbicacionDTO;