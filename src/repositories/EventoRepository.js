const Evento = require('../models/Evento');
const Categoria_evento = require('../models/Categoria_evento');
const Ubicacion = require('../models/Ubicacion');
const Imagenes_evento = require('../models/Imagenes_evento');
const BaseRepository = require('../repositories/BaseRepository');
const { Op } = require('sequelize');
class EventoRepository extends BaseRepository {
    constructor() {
        super(Evento);
    }

    async getAllEventoEncabezados() {
        try {
            const eventos = await this.model.findAll();
            return eventos;
        } catch (e) {
            throw e;
        }
    }

    async getAllEventosDatos() {
        try {
            const eventos = await this.model.findAll({
                include: [Categoria_evento, Ubicacion, Imagenes_evento]
            })
            return eventos;
        } catch (e) {
            throw e;
        }
    }

    async getEventosDatosById(id) {
        try {
            const evento = await this.model.findByPk(id, {
                include: [Categoria_evento, Ubicacion, Imagenes_evento]
            })
            return evento;
        } catch (e) {
            throw e;
        }
    }

    async updateEvento(id, evento) {
        try {

            const updatedEvento = await this.model.update(evento, {
                where: { idevento: id }
            });
            return updatedEvento;
        } catch (e) {
            throw e;
        }
    }

    async deleteEvento(id) {
        try {
            const deletedEvento = await this.model.destroy({
                where: { idevento: id }
            });
            return deletedEvento;
        } catch (e) {
            throw e;
        }
    }

    async updateEstadoEvento(id, evento) {
        try {
            let updatedEvento;

            if (evento.estado == 'Activo') {
                let existsUbicacion = await this.model.findByPk(id, {
                    include: [Ubicacion]
                });
                if (existsUbicacion.dataValues.ubicacions.length > 0) {
                    await this.model.update(evento, {
                        where: { idevento: id }
                    });
                    updatedEvento = {
                        message: 'Evento activado',
                    }
                } else {
                    throw { status: 400, message: 'No pude activar el evento, no tiene ubicación, agregue una ubicación' }
                }
            } else {
                await this.model.update(evento, {
                    where: { idevento: id }
                });
                updatedEvento = {
                    message: 'Estado actulizado',
                };
            }
            return updatedEvento;
        } catch (e) {

            throw e;
        }
    }

    async getAllPublicEventos() {
        try {
            const eventos = await this.model.findAll({
                where: {
                    estado: 'Activo',
                },
                include: [Categoria_evento, Imagenes_evento]
            })
            return eventos;
        } catch (e) {

            throw { status: 500, message: 'Error de servidor' };
        }
    }

    async getPublicEventoByCategoria(id) {
        try {
            const eventos = await this.model.findAll({
                where: {
                    estado: 'Activo',
                    idcategoria: id
                },
                include: [Categoria_evento, Imagenes_evento]
            })
            return eventos;
        } catch (e) {
            console.log(e);
            throw { status: 500, message: 'Error de servidor' };
        }
    }

    async getIdCategoria(categoria) {
        try {
            const categoria_evento = await Categoria_evento.findOne({
                where: {
                    nombre: categoria
                }
            })
            if (!categoria_evento) throw { status: 404, message: 'No se encontro la categoria' };
            return categoria_evento.dataValues.idcategoria;
        } catch (e) {
            throw e;
        }
    }

    async getAllEventos(categoria, nombre) {
        try {
            const eventos = await this.model.findAll({
                include: [
                    {
                        model: Categoria_evento,
                        where: {
                            nombre: {
                                [Op.iLike]: '%' + categoria + '%'
                            }
                        }
                    },
                    { model: Imagenes_evento }
                ],
                where: {
                    nombre: {
                        [Op.iLike]: '%' + nombre + '%'
                    },
                    estado: 'Activo'
                }
            })
            return eventos;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = EventoRepository;