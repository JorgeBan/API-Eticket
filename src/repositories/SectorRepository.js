const Sector = require('../models/Sector');
const Espacio = require('../models/Espacio');
const Ubicacion = require('../models/Ubicacion');
const BaseRepository = require('../repositories/BaseRepository');
const Repofunciones = require('../extras/SectorExtrasRepo');
const SectorDTO = require('../dto/SectorDTO');
const Entradas_sector = require('../models/Entradas_sector');
class SectorRepository extends BaseRepository {
    constructor() {
        super(Sector);
    }

    async getAllSectores() {
        try {
            const sectores = await this.model.findAll({
                include: [Espacio]
            });
            return sectores;
        } catch (e) {
            throw e;
        }
    }

    async getSectorById(id) {
        try {
            const sector = await this.model.findByPk(id, {
                include: [Espacio]
            });
            return sector;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async createSector(sector) {
        try {
            let capacidad_sector = sector.capacidad;
            let capacidad_disponible_ubicacion = await Repofunciones._capacidadDisponibleUbicacion(sector.idubicacion);
            if (capacidad_sector <= capacidad_disponible_ubicacion) {
                let sectorDTO = new SectorDTO(sector);
                const newSector = await this.model.create(sectorDTO.toJSON());
                await Repofunciones._updateCapacidadUbicaion(sector.idubicacion, capacidad_disponible_ubicacion - capacidad_sector);
                return newSector;
            } else {
                throw { status: 400, message: "No hay espacio suficiente en la ubicacion, hay " + capacidad_disponible_ubicacion + " espacios disponibles para asignar" };
            }
        } catch (e) {
            throw e;
        }
    }


    async updateSector(id, newSector) {
        try {
            let sectorActual = await this.model.findByPk(id, {
                include: [Espacio]
            });
            console.log("Sector actual: " + sectorActual)
            const capacidad_sector = newSector.capacidad;
            const diferenciaCapacidad = capacidad_sector - sectorActual.capacidad;
            console.log("Diferencia de capacidad: " + diferenciaCapacidad);
            if (diferenciaCapacidad != 0) {
                const capacidadUbicacion = await Repofunciones._capacidadDisponibleUbicacion(sectorActual.idubicacion)
                if (Repofunciones._permiteActulizar(diferenciaCapacidad, sectorActual, newSector, capacidadUbicacion)) {
                    let sectorDTO = new SectorDTO(newSector);
                    let nuevaCapacidadDisponible = sectorActual.capacidad_disponible + diferenciaCapacidad;
                    sectorDTO.capacidad_disponible = nuevaCapacidadDisponible;
                    const updatedSector = await this.model.update(sectorDTO.toJSON(), {
                        where: { idsector: id }
                    });
                    await Repofunciones._updateCapacidadUbicaion(sectorActual.idubicacion, capacidadUbicacion - diferenciaCapacidad);
                    return updatedSector;
                }
            } else {
                const updatedSector = await this.model.update(newSector, {
                    where: { idsector: id }
                });
                return updatedSector;
            }

        } catch (e) {
            throw e;
        }
    }

    async deleteSector(id) {
        try {
            const sector = await this.model.findByPk(id);
            const deletedSector = await this.model.destroy({
                where: { idsector: id }
            });
            Repofunciones._actualizarCapacidadUbicacion(sector);
            return deletedSector;
        } catch (e) {
            throw e;
        }
    }

    //Repositorio para el manejo de los sectores del lado del cliente final+
    async getSectoresByUbicacion(idubicacion) {
        try {
            const sectores = await this.model.findAll({
                where: { idubicacion: idubicacion },
            });
            return sectores;
        } catch (e) {
            throw e;
        }
    }

    async getEntradasDisponibles(idhorario, idsector) {
        try {
            const entradas_vendidas = await Entradas_sector.findOne({
                attributes: ['cantidad_vendida'],
                where: {
                    idhorario: idhorario,
                    idsector: idsector
                }
            });
            if (!entradas_vendidas) throw { status: 404, message: "NO hay sector con ese horario" };
            return entradas_vendidas.dataValues.cantidad_vendida;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCantidadDePersonas(idsector) {
        try {
            const sector = await this.model.findByPk(idsector, {
                attributes: ['capacidad']
            });
            if (!sector) throw { status: 404, message: "NO hay sector con ese id" };
            return sector.capacidad;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SectorRepository;