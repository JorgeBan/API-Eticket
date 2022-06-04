
function _permiteEditar(ubicacionActual, newUbicacion) {

    if (newUbicacion.cantidad_de_personas >= ubicacionActual.cantidad_de_personas) {
        return true;
    } else {
        let capacidadSectores = 0;
        for (let i = 0; i < ubicacionActual.sectors.length; i++) {
            capacidadSectores += ubicacionActual.sectors[i].capacidad;
        }
        return capacidadSectores <= newUbicacion.cantidad_de_personas;
    }

}

module.exports = {
    _permiteEditar
};
