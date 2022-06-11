const express = require('express');
const cors = require('cors');
//Swagger configuration
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerConfig = require('./src/config/documentation/swaggerConfig');



const EventoRoute = require('./src/api/routes/EventoRoutes');
const CategoriaRoutes = require('./src/api/routes/CategoriaRoutes');
const UbicacionRoutes = require('./src/api/routes/UbicacionRoutes');
const HorarioRoutes = require('./src/api/routes/HorarioRoutes');
const SectorRoutes = require('./src/api/routes/SectorRoutes');
const EspacioRoutes = require('./src/api/routes/EspacioRoutes');
const ImagenEventoRoutes = require('./src/api/routes/ImagenEventoRoutes');
const AuthRoutes = require('./src/api/routes/AuthRoutes');
const CompraRoutes = require('./src/api/routes/CompraRoutes');
const TipoPagoRoutes = require('./src/api/routes/TipoPagoRoutes');
const NotaVentaRoutes = require('./src/api/routes/NotaVentaRoutes');
const app = express();

const API_URI = '/api/v1.0.0';


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//swagger middleware
console.log(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerConfig)));

app.use(API_URI, EventoRoute);
app.use(API_URI, CategoriaRoutes);
app.use(API_URI, UbicacionRoutes);
app.use(API_URI, HorarioRoutes);
app.use(API_URI, SectorRoutes);
app.use(API_URI, EspacioRoutes);
app.use(API_URI, ImagenEventoRoutes);
app.use(API_URI, AuthRoutes);
app.use(API_URI, CompraRoutes);
app.use(API_URI, TipoPagoRoutes);
app.use(API_URI, NotaVentaRoutes);

app.use(API_URI, (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
        version: '1.0.0',
        year: new Date().getFullYear()
    });
});



module.exports = app;