class EventoDetalleDTO {
    constructor(evento) {
        this.idevento = evento.idevento;
        this.nombre = evento.nombre;
        this.descripcion = evento.descripcion || '';
        this.contacto = evento.contacto || 0;
        this.categoria = evento.categoria_evento.dataValues.nombre;
        this.imagenes = this._getImagenes(evento.imagenes_eventos);
        this.ubicaciones = evento.ubicacions;
    }

    _getImagenes(imagenes) {
        let imagenesEvento = [];
        for (let i = 0; i < imagenes.length; i++) {
            imagenesEvento.push(imagenes[i].dataValues.url);
        }
        return imagenesEvento;
    }

    toJSON() {
        return {
            idevento: this.idevento,
            nombre: this.nombre,
            descripcion: this.descripcion,
            contacto: this.contacto,
            categoria: this.categoria,
            imagenes: this.imagenes,
            ubicaciones: this.ubicaciones
        }
    }

}
module.exports = EventoDetalleDTO;