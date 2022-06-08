const BaseRepository = require('./BaseRepository');
const Nota_venta = require('../models/Nota_venta');
const Ticket = require('../models/Ticket');
const Detalle_venta = require('../models/Detalle_venta');
const Tipo_pago = require('../models/Tipo_pago');
const Datos_cliente = require('../models/Datos_cliente');
const Espacio_reservado = require('../models/Espacio_reservado');
const Ubicacion_repository = require('../repositories/UbicacionRepository');
const _ubicacion_repository = new Ubicacion_repository();

const Sector_repository = require('../repositories/SectorRepository');
const _sector_repository = new Sector_repository();

const Espacio_repository = require('../repositories/EspacioRepository');
const Espacio = require('../models/Espacio');
const Sector = require('../models/Sector');
const Evento = require('../models/Evento');
const Ubicacion = require('../models/Ubicacion');
const Entradas_ubicacion = require('../models/Entradas_ubicacion');
const Entradas_sector = require('../models/Entradas_sector');
const sequelize = require('../config/database/database');
const _espacio_repository = new Espacio_repository();
class CompraRepository extends BaseRepository {
    constructor() {
        super(Nota_venta);
    }

    async entradasDisponiblesUbica(idhorario, idubicacion) {
        try {
            const entradas_vendidas = await _ubicacion_repository.getEntradasDisponibles(idhorario, idubicacion);
            const total_entradas = await _ubicacion_repository.getCantidadDePersonas(idubicacion);
            return total_entradas - entradas_vendidas;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async entradasDisponiblesSector(idhorario, idubicacion, idsector) {
        try {
            const sector = await Sector.findOne({
                where: {
                    idsector: idsector,
                    idubicacion: idubicacion,
                }
            });
            if (!sector) throw { status: 404, message: 'Sector no encontrado, o no corresponde a la ubicacion' };
            const entradas_vendidas = await _sector_repository.getEntradasDisponibles(idhorario, idsector);
            const total_entradas = await _sector_repository.getCantidadDePersonas(idsector);
            return {
                nombre: sector.nombre,
                entradas_disponibles: total_entradas - entradas_vendidas,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async verificarEspacio(idhorario, idsector, idespacio) {
        try {

            const verificaEspacio = await Espacio.findOne({
                where: {
                    idespacio: idespacio,
                    idsector: idsector,
                }
            });
            if (!verificaEspacio) throw { status: 404, message: 'Espacio no encontrado, o no corresponde al sector' };
            const espacioReservado = await Espacio_reservado.findOne({
                where: {
                    idespacio,
                    idhorario,
                },
            });
            if (espacioReservado) {
                return {
                    identificador: verificaEspacio.identificador,
                    disponible: false
                };
            }
            return {
                identificador: verificaEspacio.identificador,
                disponible: true
            };

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async comprar(datosUsuario, datosCompra, iduser) {
        const t = await sequelize.transaction();
        try {
            let verificaSector = datosCompra.sectores;
            console.log("Compra datos usuario", datosUsuario.nombres);
            if (!verificaSector) {
                await this._compraUbicacion(datosUsuario, iduser, t, datosCompra);
            } else {
                console.log('Se compra con sector');
                const datosCliente = await Datos_cliente.create({
                    nombres: datosUsuario.nombres,
                    apellidos: datosUsuario.apellidos,
                    telefono: datosUsuario.telefono,
                    email: datosUsuario.email,
                    idusuario: iduser,
                }, { transaction: t });

                const nota_venta = await Nota_venta.create({
                    fecha_emision: new Date(),
                    precio_total: 0,
                    idusuario: iduser,
                    idcliente: datosCliente.idcliente,
                    idpago: datosCompra.tipoPago,
                    idevento: datosCompra.idevento,
                }, { transaction: t });

                let listaDetalles = [];
                let listaIdSectores = [];
                for (let i = 0; i < verificaSector.length; i++) {
                    console.log("entre: " + 1);
                    if (!verificaSector[i].espacios) {
                        //await this._compraSector(datosUsuario, iduser, t, datosCompra, verificaSector[i]);
                        let evento = await Evento.findByPk(datosCompra.idevento);
                        let sector = await Sector.findByPk(verificaSector[i].idsector);
                        let detalle_venta = await Detalle_venta.create({
                            descripcion: "Entrada/s para el evento " + evento.nombre + " Sector " + sector.nombre,
                            cantidad: verificaSector[i].cantidad,
                            precio_unitario: sector.precio,
                            importe: sector.precio * verificaSector[i].cantidad,
                            nronota: nota_venta.nronota,
                        }, { transaction: t });

                        listaIdSectores.push(verificaSector[i].idsector);
                        listaDetalles.push(detalle_venta.dataValues);
                    } else {
                        for (let j = 0; j < verificaSector[i].espacios.length; j++) {
                            //await this._compraEspacio(datosUsuario, iduser, t, datosCompra, verificaSector[i], verificaSector[i].espacios[j]);
                        }
                    }
                }
                console.log("Lista de detalles", listaDetalles);
                //Modifcar cantidad de entradas disponibles en ubicacion y sector
                let entradas_total = 0;
                for (let i = 0; i < listaDetalles.length; i++) {
                    let entradas_sector = await Entradas_sector.findOne({
                        where: {
                            idsector: listaIdSectores[i],
                            idhorario: datosCompra.idhorario
                        }
                    });
                    if (entradas_sector) {
                        entradas_sector.cantidad_disponible = entradas_sector.cantidad_vendida - listaDetalles[i].cantidad;
                        await entradas_sector.save({ transaction: t });
                        console.log("entradas existia perro: ", entradas_sector);
                    } else {
                        let entradas = await Entradas_sector.create({
                            idsector: listaIdSectores[i],
                            idhorario: datosCompra.idhorario,
                            cantidad_vendida: listaDetalles[i].cantidad,
                        }, { transaction: t });
                        console.log("entradas no existia perro: ", entradas);
                    }

                    entradas_total = entradas_total + listaDetalles[i].cantidad;
                }

                //modificar cantidad de entradas disponibles en ubicacion
                const entradas_ubicacion = await Entradas_ubicacion.findOne({
                    where: {
                        idubicacion: datosCompra.idubicacion,
                        idhorario: datosCompra.idhorario,
                    }
                });
                if (entradas_ubicacion) {
                    entradas_ubicacion.entradas_vendidas = entradas_ubicacion.entradas_vendidas + entradas_total;
                    await entradas_ubicacion.save({ transaction: t });
                } else {
                    const entradas = await Entradas_ubicacion.create({
                        idubicacion: datosCompra.idubicacion,
                        idhorario: datosCompra.idhorario,
                        cantidad_vendida: entradas_total,
                    }, { transaction: t });
                }

                //generar tickets 
                let listaTickets = [];
                for (let i = 0; i < listaDetalles.length; i++) {
                    for (let j = 0; j < listaDetalles[i].cantidad; j++) {
                        let ticket = await Ticket.create({
                            idhorario: datosCompra.idhorario,
                            idubicacion: datosCompra.idubicacion,
                            idsector: listaIdSectores[i],
                            nrodetalle: listaDetalles[i].nrodetalle,

                        }, { transaction: t });
                        listaTickets.push(ticket.dataValues);
                    }
                }

                console.log("Lista de tickets perro: ", listaTickets);
                throw { status: 200, message: 'Compra realizada con exito' };
            }
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async _compraUbicacion(datosUsuario, iduser, t, datosCompra) {
        const datosCliente = await Datos_cliente.create({
            nombres: datosUsuario.nombres,
            apellidos: datosUsuario.apellidos,
            telefono: datosUsuario.telefono,
            email: datosUsuario.email,
            idusuario: iduser,
        }, { transaction: t });

        const nota_venta = await Nota_venta.create({
            fecha_emision: new Date(),
            precio_total: 0,
            idusuario: iduser,
            idcliente: datosCliente.idcliente,
            idpago: datosCompra.tipoPago,
            idevento: datosCompra.idevento,
        }, { transaction: t });

        const evento = await Evento.findByPk(datosCompra.idevento);
        const ubicacion = await Ubicacion.findByPk(datosCompra.idubicacion);
        const detalle_venta = await Detalle_venta.create({
            descripcion: "Entrada/s para el evento " + evento.nombre,
            cantidad: datosCompra.cantidad,
            precio_unitario: ubicacion.precio,
            importe: ubicacion.precio * datosCompra.cantidad,
            nronota: nota_venta.nronota,
        }, { transaction: t });

        const entradas_ubicacion = await Entradas_ubicacion.findOne({
            where: {
                idubicacion: datosCompra.idubicacion,
                idhorario: datosCompra.idhorario,
            }
        });

        if (entradas_ubicacion) {
            entradas_ubicacion.entradas_vendidas = entradas_ubicacion.entradas_vendidas + datosCompra.cantidad;
            await entradas_ubicacion.save({ transaction: t });
        } else {
            const entradas = await Entradas_ubicacion.create({
                idubicacion: datosCompra.idubicacion,
                idhorario: datosCompra.idhorario,
                cantidad_vendida: datosCompra.cantidad,
            }, { transaction: t });
        }

        let listatickets = [];
        //generar ticket
        for (let i = 0; i < datosCompra.cantidad; i++) {
            const ticket = await Ticket.create({
                idhorario: datosCompra.idhorario,
                idubicacion: datosCompra.idubicacion,
                nrodetalle: detalle_venta.nrodetalle,
            }, { transaction: t });
            listatickets.push(ticket);
        }

        //generar qr del ticket
        console.log("Compra datos compra", listatickets);
        throw { status: 404, message: 'Ups' };

        await t.commit();
    }
}

module.exports = CompraRepository;