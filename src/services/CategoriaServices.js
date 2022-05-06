const CategoriaRepository = require('../repositories/CategoriaRepository');
const BaseServices = require('./BaseServices');
class CategoriaServices extends BaseServices{
    constructor(){
        super(new CategoriaRepository());
        this._categoryRepository = new CategoriaRepository();
    }

    async getAllCategoria(){
        try{
            const categorias = await this._categoryRepository.getAllCategoria();
            return categorias;
        }catch(err){
            throw err;
        }
    }
}

module.exports = CategoriaServices;