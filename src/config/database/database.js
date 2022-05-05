const Sequelize = require('sequelize');
const config = require('../../config/environments/index');

var sequelize = new Sequelize(
    config.DB.database, 
    config.DB.username,  
    config.DB.password, 
    {
        host: config.DB.host,
        dialect: config.DB.dialect,
  
        pool: {
            max: 5,
            min: 0,
            idle: 10000
    },
});

module.exports = sequelize