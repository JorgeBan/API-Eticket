const Categoria_evento = require('../../models/Categoria_evento');
const Evento = require('../../models/Evento');
const Ubicacion = require('../../models/Ubicacion');
const Horario = require('../../models/Horario');
const Sector = require('../../models/Sector');
const Imagenes_evento = require('../../models/Imagenes_evento');
const Espacio = require('../../models/Espacio');


Evento.belongsTo(Categoria_evento, {foreignKey: 'idCategoria'});
Categoria_evento.hasMany(Evento, {foreignKey: 'idCategoria'});

Imagenes_evento.belongsTo(Evento, {foreignKey: 'idEvento'});
Evento.hasMany(Imagenes_evento, {foreignKey: 'idEvento'});

Ubicacion.belongsTo(Evento, {foreignKey: 'idEvento'});
Evento.hasMany(Ubicacion, {foreignKey: 'idEvento'});

Horario.belongsTo(Ubicacion, {foreignKey: 'idUbicacion'});
Ubicacion.hasMany(Horario, {foreignKey: 'idUbicacion'});

Sector.belongsTo(Ubicacion, {foreignKey: 'idUbicacion'});
Ubicacion.hasMany(Sector, {foreignKey: 'idUbicacion'});

Espacio.belongsTo(Sector, {foreignKey: 'idSector'});
Sector.hasMany(Espacio, {foreignKey: 'idSector'});


module.exports = {
    Categoria_evento,
    Evento,
    Ubicacion,
    Horario,
    Sector,
    Imagenes_evento,
    Espacio
}
