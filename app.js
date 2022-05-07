const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const EventoRoute = require('./src/api/routes/EventoRoutes');
const CategoriaRoutes = require('./src/api/routes/CategoriaRoutes');
const UbicacionRoutes = require('./src/api/routes/UbicacionRoutes');
const HorarioRoutes = require('./src/api/routes/HorarioRoutes');
const SectorRoutes = require('./src/api/routes/SectorRoutes');
const EspacioRoutes = require('./src/api/routes/EspacioRoutes');

const app = express();

const API_URI = '/api/v1.0.0';


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));


app.use(API_URI, EventoRoute);
app.use(API_URI, CategoriaRoutes);
app.use(API_URI, UbicacionRoutes);
app.use(API_URI, HorarioRoutes);
app.use(API_URI, SectorRoutes);
app.use(API_URI, EspacioRoutes);


app.use(API_URI,(req,res)=>{
    res.status(200).json({
        message: 'Welcome to the API',
        version: '1.0.0',      
    });
});



module.exports = app;