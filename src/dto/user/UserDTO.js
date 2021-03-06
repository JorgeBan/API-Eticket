class UserDTO {
    constructor(user, rol, token) {
        this.nombre_usuario = user.nombre_usuario;
        this.email = user.email;
        this.rol = rol;
        this.estado = user.estado;
        this.token = token;
    }

    toJson() {
        return {
            nombre_usuario: this.nombre_usuario,
            email: this.email,
            rol: this.rol,
            estado: this.estado,
            token: this.token
        }
    }
}

module.exports = UserDTO;