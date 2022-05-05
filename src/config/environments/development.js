module.exports = {
    PORT: process.env.PORT_DEV || 3000,
    DB:{
        username: process.env.DB_DEV_USERNAME,
        password: process.env.DB_DEV_PASSWORD,
        database: process.env.DB_DEV_DATABASE,
        host: process.env.DB_DEV_HOST,
        dialect: "postgres",
        logging: false
    }
}