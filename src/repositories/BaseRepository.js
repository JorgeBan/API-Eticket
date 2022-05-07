class BaseRepository{

    constructor(model){
        this.model = model;
    }

    async getAll(){
        try{
            return await this.model.findAll();
        }catch(e){
            throw e;
        }
    }

    async getById(id){
        try{
            return await this.model.findByPk(id);
        }catch(e){
            throw e;
        }
    }

    async create(item){

        try{
            return await this.model.create(item);
        }catch(e){
            throw e;
        }

    }

    async update(id, item){
        
        try{
            return await this.model.update(item, {where: {id: id}});
        }catch(e){
            console.log(e);
            throw e;
        }
        
    }

    async delete(id){
        try{
            return await this.model.destroy({where: {id: id}});
        }catch(e){
            throw e;
        }
    }
}

module.exports = BaseRepository;