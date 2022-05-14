const Sector = require('../models/Sector');
function  _cantidadEspacios(espacios){
    let cantidad = 0;
    for(let i = 0; i < espacios.length; i++){
        cantidad += espacios[i].cantidad_de_personas;
    }
    return cantidad;
}

async function _existsEspaciosDisponibles(cantidadEspacios, idSector){
    const capacidadSector = await _getCapacidadSector(idSector);
    console.log(capacidadSector);
    return cantidadEspacios <= capacidadSector;
}

async function _getCapacidadSector(idSector){
    const sector = await Sector.findByPk(idSector, {
        attributes: ['capacidad_disponible']
    });
    return sector.capacidad_disponible;
}

async function _actualizarSectorCapacidad(idSector, cantidadEspacios){
    const sector = await Sector.findByPk(idSector);
    sector.capacidad_disponible = sector.capacidad_disponible - cantidadEspacios;
    await sector.save();
}


async function _permiteActualizar(idSector, diferenciaCapacidad){
    const capacidadSector = await _getCapacidadSector(idSector);
    if(diferenciaCapacidad > 0){
        return capacidadSector >= diferenciaCapacidad;
    }else{
        return true;
    }
}

module.exports = {
    _cantidadEspacios,
    _existsEspaciosDisponibles,
    _actualizarSectorCapacidad,
    _permiteActualizar
}