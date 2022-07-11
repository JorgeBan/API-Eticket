class UserControladorDTO {
    constructor(id, nombre, rol, idubicacion, ubicacion, idhorario, horario) {
        this.id = id;
        this.nombre = nombre;
        this.rol = rol;
        this.idubicacion = idubicacion;
        this.ubicacion = ubicacion;
        this.idhorario = idhorario;
        this.horario = horario;

    }
}

module.exports = UserControladorDTO;