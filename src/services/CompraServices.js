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
            const verificado = await this._verificarIds(datosCompra.idubicacion, datosCompra.idhorario, datosCompra.idevento);
            if (verificado) {
                return { message: 'Ids verficaados' };
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
}

module.exports = CompraService;