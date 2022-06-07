const BaseServices = require('./BaseServices');
const CompraRepository = require('../repositories/CompraRepository');
const UbicacionRepository = require('../repositories/UbicacionRepository');
const HorarioRepository = require('../repositories/HorarioRepository');

class CompraService extends BaseServices {
    constructor() {
        super(new CompraRepository());
        this._compraRepository = new CompraRepository();
    }

    async Comprar(datosUsuario, datosCompra) {
        try {
            const Datosverificados = await this._verificarIds(datosCompra.idubicacion, datosCompra.idhorario, datosCompra.idevento);
            if (Datosverificados) {
                console.log('Ids verficaados');
                this._verificarEntradas(datosCompra);
                console.log('TODO OK, Entradas verificadas');

            }

            throw { status: 404, message: 'Los datos de evento, ubicacion y horario no coinciden o no existen' };

        } catch (e) {
            throw e;
        }
    }

    async _verificarIds(idubicacion, idhorario, idevento) {
        try {
            const ubiRepo = new UbicacionRepository();

            //Verifica que exista la ubicacion en dicho evento 
            const existUbicacionEvento = await ubiRepo.getUbicacionByEvento(idubicacion, idevento);
            if (!existUbicacionEvento) return false;

            //Verifica que exista el horario en dicha ubicacion
            const horRepo = new HorarioRepository();
            const existHorario = await horRepo.getHorarioByUbicacion(idhorario, idubicacion);
            if (!existHorario) return false;
            return true;
        } catch (e) {
            throw e;
        }
    }

    async _verificarEntradas(datosCompra) {
        //Si no tiene sectores solo verifica que haya entradas disponibles en la ubicacion
        if (!datosCompra.sectores) {
            if (datosCompra.cantidad <= 0) throw { status: 400, message: 'La cantidad de entradas no puede ser menor o igual a 0' };
            const entradas_disponible_ubicacion = await this._compraRepository.entradasDisponiblesUbica(datosCompra.idhorario, datosCompra.idubicacion);
            if (entradas_disponible_ubicacion < datosCompra.cantidad) throw { status: 404, message: `Solo quedan ${entradas_disponible_ubicacion} entradas en esta ubicacion` };
        } else {
            //Verifica si los sectores tiene espacios, si no tienen solo verifica que haya entradas disponibles en el sector
            for (let i = 0; i < datosCompra.sectores.length; i++) {
                if (!datosCompra.sectores[i].espacios) {
                    if (datosCompra.sectores[i].cantidad <= 0) throw { status: 400, message: 'La cantidad de entradas no puede ser menor o igual a 0' };
                    const sector = await this._compraRepository.entradasDisponiblesSector(datosCompra.idhorario, datosCompra.sectores[i].idsector);
                    if (sector.entradas_disponibles < datosCompra.sectores[i].cantidad) throw { status: 404, message: `Solo quedan ${entradas_disponible_sector} entradas en el sector ${sector.nombre}` };
                } else {
                    //Si el sector tiene espacios, verifica que estos espacios esten disponibles
                    for (let j = 0; j < datosCompra.sectores[i].espacios.length; j++) {
                        const espacio = await this._compraRepository.verificarEspacio(datosCompra.idhorario, datosCompra.sectores[i].espacios[j].idespacio);
                        let espaciosNoDisponibles = [];
                        if (!espacio.disponible) {
                            espaciosNoDisponibles.push(espacio.identificador);
                        }
                    }
                    if (espaciosNoDisponibles.length > 0) {
                        const espacios = espaciosNoDisponibles.toString();
                        throw { status: 404, message: `Los espacios ${espacios} no estan disponible` };
                    }

                }
            }
        }
    }

}

module.exports = CompraService;