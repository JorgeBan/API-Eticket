const CategoriaService = require('../../services/CategoriaServices');

async function getAllCategoria(req, res) {
    try{
        const categoriaService = new CategoriaService();
        const categorias = await categoriaService.getAllCategoria();
        res.status(200).json(categorias);
    }catch(err){
        res.status(500).json(err);
    }
}

async function getCategoriaById(req, res) {
    try{
        const categoriaService = new CategoriaService();
        const categoria = await categoriaService.getById(req.params.id);
        res.status(200).json(categoria);
    }catch(err){
        res.status(500).json(err);
    }
}

async function createCategoria(req, res) {
    try{
        const categoriaService = new CategoriaService();
        const categoria = await categoriaService.create(req.body);
        res.status(201).json(categoria);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    getAllCategoria,
    getCategoriaById,
    createCategoria
}