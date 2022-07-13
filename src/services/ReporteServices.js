const ReporteRepository = require('../repositories/ReporteRepository');
const ItemReporteDTO = require('../dto/reporte/ItemReporteDTO');
const UbicacionRepository = require('../repositories/UbicacionRepository');
const SectorRepository = require('../repositories/SectorRepository');
const EspacioRepository = require('../repositories/EspacioRepository');
const EventoRepository = require('../repositories/EventoRepository');
const HorarioRepository = require('../repositories/HorarioRepository');
const UserRepository = require('../repositories/UserRepository');
const ReporteDTO = require('../dto/reporte/ReporteDTO');
const SectorReporteDTO = require('../dto/reporte/SectorReporteDTO');
class ReporteServices {
    constructor() {
        this._reporteRepository = new ReporteRepository();
        this._ubicacionRepository = new UbicacionRepository();
        this._sectorRepository = new SectorRepository();
        this._espacioRepository = new EspacioRepository();
        this._eventoRepository = new EventoRepository();
        this._horarioRepository = new HorarioRepository();
        this._userRepository = new UserRepository();
    }

    async getReporte(idubicacion) {
        try {
            let horarios = await this._reporteRepository.getHorariosByUbicacion(idubicacion);
            let ubicacion = await this._ubicacionRepository.getById(idubicacion);
            let evento = await this._eventoRepository.getById(ubicacion.idevento);

            let PartesReporte = await this._armarReporte(horarios, idubicacion, ubicacion);


            return new ReporteDTO(
                evento.nombre, ubicacion.nombre, PartesReporte
            );
        } catch (e) {
            console.log(e)
            throw { status: 404, message: 'Error, verifique la informacion' };
        }
    }

    async _armarReporte(horarios, idubicacion, ubicacion) {
        let SectoresReporte = [];
        for (let i = 0; i < horarios.length; i++) {
            let ticketsVendidos = await this._reporteRepository.getTicketsByHorario(idubicacion, horarios[i].idhorario);
            let horarioData = await this._horarioRepository.getHorarioByUbicacion(horarios[i].idhorario, idubicacion);
            let horario = horarioData.fecha_hora;
            let itemsReporte = [];
            let cantidadEntradasUsadas = 0;
            for (let j = 0; j < ticketsVendidos.length; j++) {
                let sector;
                let espacio;
                let controlador;
                let hora_registro;
                if (ticketsVendidos[j].estado === 'registrado') {
                    let registroTicket = await this._reporteRepository.getById(ticketsVendidos[j].idticket);
                    let controladorData = await this._userRepository.getById(registroTicket.idcontrolador);
                    controlador = controladorData.nombre_usuario;
                    hora_registro = registroTicket.hora_registro;
                    cantidadEntradasUsadas++;
                }

                let idsector = ticketsVendidos[j].idsector;

                if (idsector) {
                    let sectorData = await this._sectorRepository.getById(idsector);
                    let idespacio = ticketsVendidos[j].idespacio;
                    sector = sectorData.nombre;
                    if (idespacio) {
                        let espacioData = await this._espacioRepository.getById(idespacio);
                        espacio = espacioData.identificador;
                    }
                }
                let itemReporteDTO = new ItemReporteDTO(
                    ticketsVendidos[j].idticket, sector, espacio, controlador, hora_registro
                );
                itemsReporte.push(itemReporteDTO);
            }
            let sectorReporte = new SectorReporteDTO(
                horario, ubicacion.cantidad_de_personas, itemsReporte.length, cantidadEntradasUsadas, itemsReporte
            );

            SectoresReporte.push(sectorReporte);
        }
        return SectoresReporte;
    }
}

module.exports = ReporteServices;