module.exports = {
    PORT: process.env.PORT_PRO || 6000,
    DB:{
        username: process.env.DB_PRO_USERNAME,
        password: process.env.DB_PRO_PASSWORD,
        database: process.env.DB_PRO_DATABASE,
        host: process.env.DB_PRO_HOST,
        port: process.env.DB_PRO_PORT,
        dialect: "postgres",
        dialectOptions: {
            ssl: {      /* <----- Add SSL option */
              require: true,
              rejectUnauthorized: false 
            }
        },
        logging: false
    }
}