class BaseRepository{

    constructor(model){
        this.model = model;
    }

  
    async getById(id){
        return await this.model.findByPk(id);
    }

    async create(item){
        return await this.model.create(item);
    }

    async update(id, item){
        return await this.model.findByIdAndUpdate(id, item, {new: true});
    }

    async delete(id){
        return await this.model.findByIdAndRemove(id);
    }
}

module.exports = BaseRepository;