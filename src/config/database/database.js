const Sequelize = require('sequelize');
const config = require('../../config/environments/index');

var sequelize = new Sequelize(
    config.DB.database, 
    config.DB.username,  
    config.DB.password, 
    {
        host: config.DB.host,
        dialect: config.DB.dialect,
        dialectOptions: config.DB.dialectOptions,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
    },
});

module.exports = sequelize;