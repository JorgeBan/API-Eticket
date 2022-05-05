module.exports = {
    PORT: process.env.PORT_PRO || 6000,
    DB:{
        username: process.env.DB_PRO_USERNAME,
        password: process.env.DB_PRO_PASSWORD,
        database: process.env.DB_PRO_DATABASE,
        host: process.env.DB_PRO_HOST,
        dialect: "postgres",
        logging: false
    }
}