const BaseServices = require('./BaseServices');
const CompraRepository = require('../repositories/CompraRepository');
const UbicacionRepository = require('../repositories/UbicacionRepository');
const HorarioRepository = require('../repositories/HorarioRepository');
const SectorRepository = require('../repositories/SectorRepository');
var CryptoJS = require("crypto-js");
class CompraService extends BaseServices {
    constructor() {
        super(new CompraRepository());
        this._compraRepository = new CompraRepository();
    }

    async Comprar(datosUsuario, datosCompra, iduser) {
        try {
            const Datosverificados = await this._verificarIds(datosCompra.idubicacion, datosCompra.idhorario, datosCompra.idevento);
            console.log(Datosverificados);
            if (Datosverificados) {
                console.log('Ids verficaados');
                await this._verificarEntradas(datosCompra);
                console.log('TODO OK, Entradas verificadas');
                const compra = await this._compraRepository.comprar(datosUsuario, datosCompra, iduser);
                return compra;
            } else {
                throw { status: 404, message: 'Los datos de evento, ubicacion y horario no coinciden o no existen' };
            }

        } catch (e) {
            console.log(e);
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
        let verificaSectores = await this._verificarSoloUbicacion(datosCompra);
        if (verificaSectores) {
            console.log('Solo ubicacion');
        } else {
            //Verifica si los sectores tiene espacios, si no tienen solo verifica que haya entradas disponibles en el sector
            console.log('Sectores', datosCompra.sectores.length);
            for (let i = 0; i < datosCompra.sectores.length; i++) {
                let verificaEspacios = await this._verificaEspacios(datosCompra.sectores[i], datosCompra.idubicacion, datosCompra.idhorario);
                if (verificaEspacios) {
                    console.log('Solo sectores');
                } else {
                    //Si el sector tiene espacios, verifica que estos espacios esten disponibles
                    let _verificaEspacioDisponible = await this._verificaEspacioDisponible(datosCompra.sectores[i], datosCompra.idubicacion, datosCompra.idhorario);
                    if (_verificaEspacioDisponible) {
                        console.log('sectores y espacios');
                    }
                }

            }
        }
    }


    async _verificaEspacioDisponible(sectores, idubicacion, idhorario) {
        let espaciosNoDisponibles = [];
        const _sector_repository = new SectorRepository();
        let verificaSector = await _sector_repository.getSectorById(sectores.idsector);
        if (idubicacion != verificaSector.dataValues.idubicacion) throw { status: 404, message: 'El sector no pertenece a la ubicacion' };
        for (let j = 0; j < sectores.espacios.length; j++) {
            const espacio = await this._compraRepository.verificarEspacio(idhorario, sectores.idsector, sectores.espacios[j].idespacio);
            if (!espacio.disponible) {
                espaciosNoDisponibles.push(espacio.identificador);
            }
        }
        if (espaciosNoDisponibles.length > 0) {
            const espacios = espaciosNoDisponibles.toString();
            throw { status: 404, message: `Los espacios ${espacios} no estan disponible` };
        }
        return true;
    }

    async _verificaEspacios(sectores, idubicacion, idhorario) {
        if (!sectores.espacios) {
            let _sector_repository = new SectorRepository();
            let verificaSector = await _sector_repository.getSectorById(sectores.idsector);
            if (verificaSector === null) throw { status: 404, message: 'El sector no existe' };
            if (idubicacion != verificaSector.dataValues.idubicacion) throw { status: 404, message: 'El sector no pertenece a la ubicacion' };
            if (verificaSector.dataValues.espacios.length > 0) throw { status: 404, message: 'El sector tiene espacios, debe seleccionar espacios' };
            if (sectores.cantidad <= 0 || !sectores.cantidad)
                throw { status: 400, message: 'La cantidad de entradas no puede ser menor o igual a 0' };
            const sector = await this._compraRepository.entradasDisponiblesSector(idhorario, idubicacion, sectores.idsector);
            if (sector.entradas_disponibles < sectores.cantidad)
                throw { status: 404, message: `Solo quedan ${sector.entradas_disponibles} entradas en el sector ${sector.nombre}` };
            return true;
        }
        return false;

    }

    async _verificarSoloUbicacion(datosCompra) {
        if (!datosCompra.sectores) {
            let _ubicacion_repository = new UbicacionRepository();
            let ubicacion = await _ubicacion_repository.getUbicacionById(datosCompra.idubicacion);
            if (ubicacion.sectors.length > 0) throw { status: 404, message: 'La ubicacion tiene sectores, debe seleccionar un sector' };
            if (datosCompra.cantidad <= 0 || !datosCompra.cantidad)
                throw { status: 400, message: 'La cantidad de entradas no puede ser menor o igual a 0' };
            const entradas_disponible_ubicacion = await this._compraRepository.entradasDisponiblesUbica(datosCompra.idhorario, datosCompra.idubicacion);
            if (entradas_disponible_ubicacion < datosCompra.cantidad)
                throw { status: 404, message: `Solo quedan ${entradas_disponible_ubicacion} entradas en esta ubicacion` };

            return true;
        }
        return false;
    }

    desencryptarTickets(ticket) {
        try {
            let ticketDesncriptado = CryptoJS.AES.decrypt(ticket, process.env.AES_KEY).toString(CryptoJS.enc.Utf8);
            return JSON.parse(ticketDesncriptado);
        } catch (e) {
            throw { status: 400, message: 'Informacion incorrecta' };
        }
    }
}

module.exports = CompraService;