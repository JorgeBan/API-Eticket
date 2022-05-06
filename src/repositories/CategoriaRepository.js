const Categoria_evento = require('../models/Categoria_evento');
const BaseRepository = require('./BaseRepository');

class CategoriaRepository extends BaseRepository {
    constructor() {
        super(Categoria_evento);
    }

    async getAllCategoria() {
        try {
            const categorias = await this.model.findAll();
            return categorias;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = CategoriaRepository;