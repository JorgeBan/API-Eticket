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
const PDF = require('pdfkit-construct');
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
            let ticketsVendidos = await this._reporteRepository.getTickets(idubicacion);
            let ubicacion = await this._ubicacionRepository.getById(idubicacion);
            let evento = await this._eventoRepository.getById(ubicacion.idevento);
            let idhorarioTemp = -1;
            let horarioData = -1;
            let itemsReporte = [];
            for (let i = 0; i < ticketsVendidos.length; i++) {
                let sector, espacio, controlador, hora_registro;
                if (idhorarioTemp !== ticketsVendidos[i].idhorario) {
                    console.log("idhorarioTemp = " + idhorarioTemp);
                    horarioData = await this._horarioRepository.getHorarioByUbicacion(ticketsVendidos[i].idhorario, idubicacion);
                    idhorarioTemp = ticketsVendidos[i].idhorario;
                }

                let horario = this._formatearFechaHora(horarioData.fecha_hora);
                if (ticketsVendidos[i].estado === 'registrado') {
                    let registroTicket = await this._reporteRepository.getById(ticketsVendidos[i].idticket);
                    let controladorData = await this._userRepository.getById(registroTicket.idcontrolador);
                    controlador = controladorData.nombre_usuario;
                    hora_registro = this._formatearFechaHora(registroTicket.hora_registro);
                }

                let idsector = ticketsVendidos[i].idsector;

                if (idsector) {
                    let sectorData = await this._sectorRepository.getById(idsector);
                    let idespacio = ticketsVendidos[i].idespacio;
                    sector = sectorData.nombre;
                    if (idespacio) {
                        let espacioData = await this._espacioRepository.getById(idespacio);
                        espacio = espacioData.identificador;
                    }
                }

                let itemReporteDTO = new ItemReporteDTO(
                    ticketsVendidos[i].idticket, horario, sector, espacio, controlador, hora_registro
                );
                itemsReporte.push(itemReporteDTO);
            }
            return new ReporteDTO(
                evento.nombre, ubicacion.nombre, itemsReporte
            );
        } catch (e) {
            throw { status: 404, message: 'No existe la ubicacion' };
        }
    }

    _formatearFechaHora(horario) {
        let date = new Date(horario);
        let minutos = date.getMinutes() + '';
        if (minutos.length === 1)
            minutos = minutos + '0';
        let hora = date.getHours() + ':' + minutos;
        let fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return fecha + '  ' + hora;
    }
    /*
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
    
        async getReportePDF(res, infoData) {
            try {
                const doc = new PDF({ bufferPage: true });
                const fileName = `Reporte${Date.now()}.pdf`;
                console.log(infoData.horarios[0].entradasVendidas);
                const stream = res.writeHead(200,
                    {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': `attachment; filename="${fileName}"`,
                    })
    
                doc.on('data', (data) => { stream.write(data) });
                doc.on('end', () => { stream.end() });
                let optionTable = {
                    border: null,
                    width: "fill_body",
                    striped: true,
                    stripedColors: ["#f6f6f6", "#d6c4dd"],
                    cellsPadding: 10,
                    marginTop: 60,
                    marginBottom: 60,
                    marginLeft: 45,
                    marginRight: 45,
                    headAlign: 'center'
                };
    
                for (let i = 0; i < infoData.horarios.length; i++) {
                    if (infoData.horarios[i].entradasVendidas.length > 0) {
                        doc.addTable(
                            [
                                {
                                    key: 'horario', label: 'Horario',
                                    key: 'cantidadEntradasTotal', label: 'Total Entradas', align: 'left',
                                    key: 'cantidadEntradasVendidas', label: 'Entradas Vendidas', align: 'left',
                                    key: 'cantidadEntradasUsadas', label: 'Entradas Usadas', align: 'right',
                                }
                            ], infoData.horarios[i], optionTable
                        );
                        doc.addTable([
                            { key: 'ticket', label: 'Ticket', align: 'left' },
                            { key: 'sector', label: 'Sector', align: 'left' },
                            { key: 'espacio', label: 'Espacio', align: 'left' },
                            { key: 'registrado_por', label: 'Registrado por', align: 'left' },
                            { key: 'hora_registro', label: 'Hora de registro', align: 'right' },
    
                        ], infoData.horarios[i].entradasVendidas, optionTable);
                    }
                }
                doc.render();
                doc.end();
            } catch (e) {
                throw e;
            }
        }*/
}

module.exports = ReporteServices;