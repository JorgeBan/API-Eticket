class ItemReporteDTO {
    constructor(idticket, sector, espacio, registrado_por, hora_registro) {
        this.ticket = idticket;
        this.sector = sector || 'N/A';
        this.espacio = espacio || 'N/A';
        this.registrado_por = registrado_por || 'Sin registrar';
        this.hora_registro = hora_registro || 'Sin registrar';
    }
}

module.exports = ItemReporteDTO;