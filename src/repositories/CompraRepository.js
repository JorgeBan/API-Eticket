const BaseRepository = require('./BaseRepository');
const Nota_venta = require('../models/Nota_venta');
const Ticket = require('../models/Ticket');
const Detalle_venta = require('../models/Detalle_venta');
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
const User = require('../models/User');
const Horario = require('../models/Horario');

const fs = require('fs');
const path = require('path');
const { lista } = require('../public/qr/test');
//para encriptar la informacion del Qr
var CryptoJS = require("crypto-js");
//Para crear Qr
var QRCode = require('qrcode')
var PDFDocument = require('pdfkit');

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
        let listaTickets = [];
        try {
            let verificaSector = datosCompra.sectores;
            let nota_venta = await this._crearNotaVenta(datosUsuario, iduser, t, datosCompra, verificaSector);
            if (!verificaSector) {
                listaTickets = await this._compraUbicacion(t, datosCompra, nota_venta);
            } else {
                listaTickets = await this._compraSector(verificaSector, datosCompra, nota_venta, t);
            }

            let infoTickets = await this._generarQr(listaTickets);
            let listaQr = infoTickets[0];
            let listaDetalleTicket = infoTickets[1];
            let listaPdf = await this._generarPfd(listaQr, listaDetalleTicket, datosCompra);

            await t.commit();
            return {
                status: 200,
                message: 'Compra realizada con exito, revisa tu correo ' + datosUsuario.email + ' para verificar tus tickets, gracias por la compra',
                nota_venta: {
                    nronota: nota_venta.nronota,
                    fecha_emision: nota_venta.fecha_emision,
                    precio_total: nota_venta.precio_total,
                }
            };
        } catch (error) {
            await t.rollback();
            console.log(error);
            throw { status: 500, message: 'Ocurrio un error, intentelo mas tarde, o revisa tu conexion a internet' };
        }
    }

    async _generarPfd(listaQr, listaDetalleTicket, datosCompra) {
        let listaPdf = [];
        let pathPDF = path.join(__dirname, '../public/pdf/');
        const evento = await Evento.findByPk(datosCompra.idevento);
        const ubicacion = await Ubicacion.findByPk(datosCompra.idubicacion);
        const horario = await Horario.findByPk(datosCompra.idhorario);
        const nombreEvento = evento.dataValues.nombre;
        const nombreUbicacion = ubicacion.dataValues.nombre;
        const nombreHorario = horario.dataValues.fecha_hora;
        let hora = new Date(nombreHorario);
        let minutos = hora.getMinutes() + '';
        if (minutos.length === 1) minutos = minutos + '0';
        let horaFormato = hora.getHours() + ':' + minutos
        let fechaFormato = hora.getDate() + '/' + (hora.getMonth() + 1) + '/' + hora.getFullYear();

        for (let i = 0; i < listaQr.length; i++) {
            let doc = new PDFDocument({
                size: 'A7',
                layout: 'portrait',
            });
            let nombrePDF = pathPDF + new Date().getTime() + '_' + i + '.pdf';
            listaPdf.push(nombrePDF);
            doc.pipe(fs.createWriteStream(nombrePDF));

            doc.fontSize(15).text(nombreEvento, 30, 10, { width: 190, align: 'justify' });
            doc.moveDown(0.8);
            doc.fontSize(10).text('Ubicacion: ' + nombreUbicacion, { width: 170, align: 'justify' });
            doc.moveDown(0.8);
            doc.fontSize(10).text('Fecha: ' + fechaFormato, { width: 170, align: 'justify' });
            doc.moveDown(0.8);
            doc.fontSize(10).text('Hora: ' + horaFormato, { width: 170, align: 'justify' });
            doc.moveDown(0.8);
            if (listaDetalleTicket[i].sector != 'N/A') {
                doc.fontSize(10).text('Sector: ' + listaDetalleTicket[i].sector, { width: 170, align: 'justify' });
                doc.moveDown(0.8);
            }

            if (listaDetalleTicket[i].espacio != 'N/A') {
                doc.fontSize(10).text('Espacio: ' + listaDetalleTicket[i].espacio, { width: 170, align: 'justify' });
                doc.moveDown(0.8);
            }


            doc.image(listaQr[i], 50, 180, {
                fit: [100, 100]
            });
            doc.end();
        }

        return listaPdf;
    }

    async _generarQr(listaTickets) {
        //let infoTickets = this._obtenerInfoTickets(listaTickets);
        let info = await this._obtenerInfoTickets(listaTickets);
        let infoTickets = info[0];
        let detalle_ticket = info[1];
        let ticketSinEncriptar = info[2]
        console.log("tickets encriptados ", infoTickets);
        console.log("detalle tickets ", detalle_ticket);
        console.log("tickets sin encriptar ", ticketSinEncriptar);

        //generar qr
        let listaDeQr = [];
        for (let i = 0; i < infoTickets.length; i++) {
            let ticket = JSON.stringify(infoTickets[i]);
            let url = await QRCode.toDataURL(ticket);
            let image = url.split(';base64,').pop();
            let pathImage = path.join(__dirname, '../public/qr/');
            let nombreTicket = new Date().getTime() + '_' + i + '.png';
            fs.writeFileSync(pathImage + nombreTicket, image, { encoding: 'base64' });
            listaDeQr.push(pathImage + nombreTicket);
        }
        console.log("lista de qr ", listaDeQr);
        return [listaDeQr, detalle_ticket];
    }

    async _obtenerInfoTickets(listaTickets) {
        let usuario = await User.findByPk(listaTickets[0].idusuario);
        let nombreUsuario = usuario.dataValues.nombre_usuario;
        let emailUsuario = usuario.dataValues.email;
        let ticketsEncriptados = [];
        let listaDetalleTicket = [];
        let ticketSinEncriptar = [];
        for (let i = 0; i < listaTickets.length; i++) {
            let nombreSector = 'N/A';
            let nombreEspacio = 'N/A';
            if (listaTickets[i].idsector) {
                let ubicacion = await Sector.findByPk(listaTickets[i].idsector);
                nombreSector = ubicacion.dataValues.nombre;
            }

            if (listaTickets[i].idespacio) {
                let espacio = await Espacio.findByPk(listaTickets[i].idespacio);
                nombreEspacio = espacio.dataValues.identificador;
            }

            let infoTicket = {
                idticket: listaTickets[i].idticket,
                nombreUsuario: nombreUsuario,
                emailUsuario: emailUsuario,
            }
            let detalleTicket = {
                sector: nombreSector,
                espacio: nombreEspacio,
            }
            let ticketsEncriptado = CryptoJS.AES.encrypt(JSON.stringify(infoTicket), process.env.AES_KEY).toString();
            ticketsEncriptados.push(ticketsEncriptado);
            listaDetalleTicket.push(detalleTicket);
            ticketSinEncriptar.push(infoTicket);
        }
        return [ticketsEncriptados, listaDetalleTicket, ticketSinEncriptar];
    }
    async _compraSector(verificaSector, datosCompra, nota_venta, t) {
        let listaSinEspacios = [];
        let listaConEspacios = [];
        for (let i = 0; i < verificaSector.length; i++) {
            if (!verificaSector[i].espacios) {
                listaSinEspacios.push(verificaSector[i]);
            } else {
                listaConEspacios.push(verificaSector[i]);
            }

        }
        let tikectsSinEspacios = await this._detallesSectorSinEspacios(listaSinEspacios, datosCompra, nota_venta, t);
        let tikectsConEspacios = await this._detallesSectorConEspacios(listaConEspacios, datosCompra, nota_venta, t);

        let listaTikectsSinEspacios = tikectsSinEspacios.tickets;
        let listaTikectsConEspacios = tikectsConEspacios.tickets;
        let cantidad_entradas_vendidas = tikectsSinEspacios.entradas_total + tikectsConEspacios.entradas_total;
        await this._modificarCantidadEntradasUbicacion(datosCompra, cantidad_entradas_vendidas, t);

        console.log("cantidad de entradas vendidas: " + cantidad_entradas_vendidas);
        console.log("listaTickets sin espacios", listaTikectsSinEspacios);
        console.log("listaTickets con espacios", listaTikectsConEspacios);
        console.log("nota_venta", nota_venta.dataValues);
        let listaTikects = listaTikectsSinEspacios.concat(listaTikectsConEspacios);
        return listaTikects;
    }

    async _modificarPrecioTotal(nota_venta, t, listaDetalles) {
        let precioTotal = Number(0.00);
        for (let i = 0; i < listaDetalles.length; i++) {
            let importe = Number(listaDetalles[i].importe);
            precioTotal = precioTotal + importe;

        }
        nota_venta.precio_total = precioTotal;
        await nota_venta.save({ transaction: t });
    }

    async _modificarCantidadEntradasUbicacion(datosCompra, entradas_total, t) {
        let entradas_ubicacion = await Entradas_ubicacion.findOne({
            where: {
                idubicacion: datosCompra.idubicacion,
                idhorario: datosCompra.idhorario,
            }
        });
        if (entradas_ubicacion) {
            let nueva_cantidad_vendida = entradas_ubicacion.dataValues.cantidad_vendida + entradas_total;
            await Entradas_ubicacion.update({
                cantidad_vendida: nueva_cantidad_vendida,
            }, {
                where: {
                    idubicacion: datosCompra.idubicacion,
                    idhorario: datosCompra.idhorario,
                }
            }, { transaction: t })

        } else {
            let entradas = await Entradas_ubicacion.create({
                idubicacion: datosCompra.idubicacion,
                idhorario: datosCompra.idhorario,
                cantidad_vendida: entradas_total,
            }, { transaction: t });
        }
    }

    async _modificarCantidadEntradasSector(listaDetalles, listaIdSectores, datosCompra, t) {
        let entradas_total = 0;
        for (let i = 0; i < listaDetalles.length; i++) {
            let entradas_sector = await Entradas_sector.findOne({
                where: {
                    idsector: listaIdSectores[i],
                    idhorario: datosCompra.idhorario
                }
            });

            if (entradas_sector) {
                await Entradas_sector.update({
                    cantidad_vendida: entradas_sector.cantidad_vendida + listaDetalles[i].cantidad
                }, {
                    where: {
                        idsector: listaIdSectores[i],
                        idhorario: datosCompra.idhorario
                    }

                }, { transaction: t });

            } else {
                let entradas = await Entradas_sector.create({
                    idsector: listaIdSectores[i],
                    idhorario: datosCompra.idhorario,
                    cantidad_vendida: listaDetalles[i].cantidad,
                }, { transaction: t });
            }
            entradas_total = entradas_total + listaDetalles[i].cantidad;
        }
        return entradas_total;
    }

    async _detallesSectorSinEspacios(listaSinEspacios, datosCompra, nota_venta, t) {
        let listaIdSectores = [];
        let listaDetalles = [];
        let evento = await Evento.findByPk(datosCompra.idevento);
        for (let i = 0; i < listaSinEspacios.length; i++) {
            let sector = await Sector.findByPk(listaSinEspacios[i].idsector);
            let detalle_venta = await Detalle_venta.create({
                descripcion: "Entrada/s para el evento " + evento.nombre + " Sector " + sector.nombre,
                cantidad: listaSinEspacios[i].cantidad,
                precio_unitario: sector.precio,
                importe: sector.precio * listaSinEspacios[i].cantidad,
                nronota: nota_venta.nronota,
            }, { transaction: t });

            listaIdSectores.push(listaSinEspacios[i].idsector);
            listaDetalles.push(detalle_venta.dataValues);
        }

        console.log("lista Detalles sin espacios", listaDetalles);
        return await this._crearTicketsSinEspacios(listaDetalles, listaIdSectores, datosCompra, t, nota_venta);
    }

    async _detallesSectorConEspacios(listaConEspacios, datosCompra, nota_venta, t) {
        let evento = await Evento.findByPk(datosCompra.idevento);
        let nombreEvento = evento.dataValues.nombre;
        let tickets = [];
        let cantidad_vendida_ubicacion = 0;
        let listaDetalles = [];
        for (let i = 0; i < listaConEspacios.length; i++) {
            let sector = await Sector.findByPk(listaConEspacios[i].idsector);
            let nombreSector = sector.dataValues.nombre;
            let cantidad_vendida_sector = 0;
            for (let j = 0; j < listaConEspacios[i].espacios.length; j++) {
                let espacio = await Espacio.findByPk(listaConEspacios[i].espacios[j].idespacio);
                let nombreEspacio = espacio.dataValues.identificador;
                let detalle_venta = await Detalle_venta.create({
                    descripcion: "Entrada/s para el evento " + nombreEvento + " Sector " + nombreSector + " Espacio " + nombreEspacio,
                    cantidad: 1,
                    precio_unitario: espacio.precio,
                    importe: espacio.precio,
                    nronota: nota_venta.nronota,
                }, { transaction: t });

                listaDetalles.push(detalle_venta.dataValues);
                cantidad_vendida_ubicacion = cantidad_vendida_ubicacion + espacio.cantidad_de_personas;
                cantidad_vendida_sector = cantidad_vendida_sector + espacio.cantidad_de_personas;

                await this._crearTicketConEspacios(datosCompra, listaConEspacios[i].idsector, espacio, detalle_venta, t, tickets, nota_venta);
                //Modificar el precio total de la nota de venta
                let importe = Number(detalle_venta.dataValues.importe);
                nota_venta.precio_total = nota_venta.precio_total + importe;
                await nota_venta.save({ transaction: t });
            }
            //actualizar cantidad vendida de sector
            await this._modificarCantidadDeSectorConEspacio(listaConEspacios[i], datosCompra, cantidad_vendida_sector, t);
        }
        console.log("lista Detalles con espacios", listaDetalles);
        return {
            tickets: tickets,
            entradas_total: cantidad_vendida_ubicacion
        };
    }
    async _modificarCantidadDeSectorConEspacio(listaConEspacios, datosCompra, cantidad_vendida_sector, t) {
        let entradas_sector = await Entradas_sector.findOne({
            where: {
                idsector: listaConEspacios.idsector,
                idhorario: datosCompra.idhorario
            }
        });
        if (entradas_sector) {
            entradas_sector.cantidad_vendida = entradas_sector.cantidad_vendida + cantidad_vendida_sector;
            await entradas_sector.save({ transaction: t });
        } else {
            await Entradas_sector.create({
                idsector: listaConEspacios.idsector,
                idhorario: datosCompra.idhorario,
                cantidad_vendida: cantidad_vendida_sector,
            }, { transaction: t });
        }
    }

    async _crearTicketConEspacios(datosCompra, idsector, espacio, detalle_venta, t, tickets, nota_venta) {
        for (let i = 0; i < espacio.cantidad_de_personas; i++) {
            let ticket = await Ticket.create({
                idhorario: datosCompra.idhorario,
                idubicacion: datosCompra.idubicacion,
                idsector: idsector,
                idespacio: espacio.idespacio,
                nrodetalle: detalle_venta.nrodetalle,
                idusuario: nota_venta.idusuario,
            }, { transaction: t });

            tickets.push(ticket.dataValues);
        }
        //modificar estados de los espacios
        await Espacio_reservado.create({
            idespacio: espacio.idespacio,
            idhorario: datosCompra.idhorario,
        }, { transaction: t });


    }

    async _crearTicketsSinEspacios(listaDetalles, listaIdSectores, datosCompra, t, nota_venta) {
        let entradas_total = await this._modificarCantidadEntradasSector(listaDetalles, listaIdSectores, datosCompra, t);

        //await this._modificarCantidadEntradasUbicacion(datosCompra, entradas_total, t);

        //actulizar preicio total de la nota de venta
        await this._modificarPrecioTotal(nota_venta, t, listaDetalles);
        //generar tickets 
        let listaTickets = [];
        for (let i = 0; i < listaDetalles.length; i++) {
            for (let j = 0; j < listaDetalles[i].cantidad; j++) {
                let ticket = await Ticket.create({
                    idhorario: datosCompra.idhorario,
                    idubicacion: datosCompra.idubicacion,
                    idsector: listaIdSectores[i],
                    nrodetalle: listaDetalles[i].nrodetalle,
                    idusuario: nota_venta.idusuario,
                }, { transaction: t });
                listaTickets.push(ticket.dataValues);
            }
        }
        return { tickets: listaTickets, entradas_total: entradas_total };
    }

    async _crearNotaVenta(datosUsuario, iduser, t, datosCompra) {
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

        return nota_venta;
    }

    async _compraUbicacion(t, datosCompra, nota_venta) {
        const evento = await Evento.findByPk(datosCompra.idevento);
        const ubicacion = await Ubicacion.findByPk(datosCompra.idubicacion);

        const detalle_venta = await Detalle_venta.create({
            descripcion: "Entrada/s para el evento " + evento.nombre,
            cantidad: datosCompra.cantidad,
            precio_unitario: ubicacion.precio,
            importe: ubicacion.precio * datosCompra.cantidad,
            nronota: nota_venta.nronota,
        }, { transaction: t });


        await this._modificarCantidadEntradasUbicacion(datosCompra, datosCompra.cantidad, t);

        //modificar precio total de la nota de venta
        await this._modificarPrecioTotal(nota_venta, t, [detalle_venta.dataValues]);

        //generar ticket
        let listatickets = [];
        for (let i = 0; i < datosCompra.cantidad; i++) {
            const ticket = await Ticket.create({
                idhorario: datosCompra.idhorario,
                idubicacion: datosCompra.idubicacion,
                nrodetalle: detalle_venta.nrodetalle,
                idusuario: nota_venta.idusuario,
            }, { transaction: t });
            listatickets.push(ticket.dataValues);
        }

        //generar qr del ticket
        console.log("lista de tickets", listatickets);
        console.log("nota de venta", nota_venta.dataValues);
        return listatickets;
    }

}

module.exports = CompraRepository;