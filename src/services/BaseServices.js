class BaseServices{
    constructor(Repository){
        this.Repository = Repository;
    }

    async getAll(){
        try{
            let result = await this.Repository.getAll();
            return result;
        }catch(e){
            throw e;
        }
    }

    async getById(id){
        try{
            let result = await this.Repository.getById(id);
            return result;
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    async create(data){
        console.log(data);
        try{
            let result = await this.Repository.create(data);
            return result;
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    async update(id, data){
        try{
            let result = await this.Repository.update(id, data);
            return result;
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    async delete(id){
        try{
            let result = await this.Repository.delete(id);
            return result;
        }catch(e){
            console.log(e);
            throw e;
        }
    }

}

module.exports = BaseServices;