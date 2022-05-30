const path = require('path');

//Swagger configuration
const swaggerSpec = {
    definition: {
        openapi : '3.0.0',
        info: {
            title: 'Evento API',
            version: '1.0.0',
            description: 'API para el manejo de eventos',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/v1.0.0',
                description: 'Local server'
<<<<<<< HEAD
            }
=======
            },
>>>>>>> main
        ]
    },

    apis: [`${path.join(__dirname, '../../../src/api/routes/*.js')}`]
}
module.exports = swaggerSpec;