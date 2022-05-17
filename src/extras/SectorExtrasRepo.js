const Ubicacion =  require('../models/Ubicacion');
const Sector = require('../models/Sector');
async function _capacidadDisponibleUbicacion(idubicacion){
    try {
        const capacidad = await Ubicacion.findByPk(idubicacion, {
            attributes: ['capacidad_disponible'],
            where :{
                idubicacion : idubicacion
            }
        });
        return capacidad.capacidad_disponible;
    }catch(e){
        throw e;
    }
}

function _permiteActulizar(diferenciaCapacidad, sectorActual, newSector, capacidadUbicacion){
    if(diferenciaCapacidad > 0){
        if(diferenciaCapacidad > capacidadUbicacion){
            throw {status: 400 , message : "No hay espacio suficiente en la ubicacion, hay " + capacidadUbicacion + " espacios disponibles para asignar"};
        }
            return true;
    }else{
        if(sectorActual.espacios.length > 0){
            if(_puedeDisminuir(sectorActual, newSector)){
                return true;
            }
            throw {status: 400 , message: "Tienes espacios asignados en este sector, no puedes disminuir la capacidad"};
        }else{
            return true;
        }
    }    
}

function _puedeDisminuir(sectorActual, newSector){
    
    let sumaEspacios = 0;
    for(let i = 0; i < sectorActual.espacios.length; i++){
        sumaEspacios += sectorActual.espacios[i].cantidad_de_personas;
    }
    console.log("sumaEspacios: " + sumaEspacios);
    console.log("espacios: " + sectorActual.espacios);
    return sumaEspacios <= newSector.capacidad;
}

async function _updateCapacidadUbicaion(idubicacion, capacidad){
    try {
        const updatedCapacidad = await Ubicacion.update({
            capacidad_disponible : capacidad
        },{
            where :{
                idubicacion : idubicacion
            }
        });
        return updatedCapacidad;
    }catch(e){
        throw e;
    }
}

async function _actualizarCapacidadUbicacion(sector){
    try{
        const capacidadUbicacion = await _capacidadDisponibleUbicacion(sector.idubicacion);

        return await Ubicacion.update({
            capacidad_disponible : capacidadUbicacion + sector.capacidad
        },{
            where :{
                idubicacion : sector.idubicacion
            }
        });

    }catch(e){
        throw e;
    }

}


module.exports = {
    _capacidadDisponibleUbicacion,
    _updateCapacidadUbicaion,
    _permiteActulizar,
    _actualizarCapacidadUbicacion
}
