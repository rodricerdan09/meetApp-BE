//Server generated
const express = require('express');
const morgan = require('morgan');

//imports models
//var Locales = require('./src/models/locales.models.js');


//cors
var cors = require('cors');
var app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Content-Type:application/json, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.header('Allow', 'GET, POST, PATCH, PUT, DELETE');
    next();
});

//imports routes 
//locales
const localesRoute = require('./src/routes/locales.routes.js');
app.use('/api', localesRoute);
//categorias
const categoriasRoute = require('./src/routes/categorias.routes.js');
app.use('/api', categoriasRoute);
//mesas
const mesasRoute = require('./src/routes/mesas.routes.js');
app.use('/api', mesasRoute);
//mesas
const comensalesRoute = require('./src/routes/comensales.routes.js');
app.use('/api', comensalesRoute);



//Run Server
var Port = process.env.PORT || 5000;
var IP = process.env.IP || '127.0.0.1';
app.listen(Port, IP, (err) => {
    if (err) {
       console.log(err)
   } else {
       console.log(`Server running at http://${IP}:${Port}/`);
    }
});