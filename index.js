const app = require('./app');
const config = require('./src/config/environments/index');
const connection = require('./src/config/database/database');
const port = config.PORT || 3000;

function main() {
    app.listen(port, () => {
        console.log(`El servidor esta escuchando en el puerto:  ${port}`);
        connection.authenticate()
            .then(() => {
                    console.log('Conexion a la base de datos establecida con exito');
                }).catch(err => {
                    console.error('Upps.. Hubo un error, no se pudo conectar a la base de datos :( :', err);  
                })

    });
}

main();