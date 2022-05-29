const BaseServices = require('./BaseServices');
const EventoRepository = require('../repositories/EventoRepository');
const EventoActivoDTO = require('../dto/evento/EventoActivoDTO');
class EventoServices extends BaseServices {
    constructor() {
        super(new EventoRepository());
        this._eventoRepository = new EventoRepository();
    }

    async getAllEventoEncabezados() {
        try {
            const eventos = await this._eventoRepository.getAllEventoEncabezados();
            return eventos;
        } catch (e) {
            throw e;
        }
    }

    async getAllEventosDatos() {
        try {
            const eventos = await this._eventoRepository.getAllEventosDatos();
            return eventos;
        }catch(e){
            throw e;
        } 
    }

    async getEventoEncabezadosById(id) {
        try {
            const evento = await this._eventoRepository.getById(id);
            return evento;
        }catch(e){
            throw e;
        }
    }

    async getEventosDatosById(id) {
        try {
            const evento = await this._eventoRepository.getEventosDatosById(id);
            return evento;
        }catch(e){
            throw e;
        }
    }
    
    async updateEvento(id, evento) {
        try {
            const updatedEvento = await this._eventoRepository.updateEvento(id, evento);
            return updatedEvento;
        }catch(e){
            throw e;
        }
    }

    async deleteEvento(id) {
        try {
            const deletedEvento = await this._eventoRepository.deleteEvento(id);
            return deletedEvento;
        }catch(e){
            throw e;
        }
    }

    async updateEstadoEvento(id, evento) {
        try {
            const updatedEvento = await this._eventoRepository.updateEstadoEvento(id, evento);
            return updatedEvento;
        }catch(e){
            throw e;
        }

    }


async getAllPublicEventos() {
    try {
        let eventosActivos = []
        const eventos = await this._eventoRepository.getAllPublicEventos();
        for (let i = 0; i < eventos.length; i++) {
            let eventoActivo = new EventoActivoDTO(eventos[i].dataValues);
            eventosActivos.push(eventoActivo);
        }
        return eventosActivos;
    }catch(e){
        throw e;
    }
}


}
module.exports = EventoServices;