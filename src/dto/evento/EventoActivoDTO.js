class EventoActivoDTO{
    constructor(Evento){
        this.idevento = Evento.idevento;
        this.nombre = Evento.nombre;
        this.descripcion = Evento.descripcion;
        this.estado = Evento.estado;
        this.categoria = Evento.categoria_evento.dataValues.nombre;
        this.imagenes = this._getImagenes(Evento.imagenes_eventos); 
    }

    _getImagenes(imagenes){
        let imagenesEvento = [];
        for (let i = 0; i < imagenes.length; i++) {
            imagenesEvento.push(imagenes[i].dataValues.url);
        }
        return imagenesEvento;
    }

    toJSON(){
        return {
            idevento: this.idevento,
            nombre: this.nombre,
            descripcion: this.descripcion,
            estado: this.estado,
            categoria: this.categoria,
            imagenes: this.imagenes
        }
    }
}

module.exports = EventoActivoDTO;
