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
//empresas
const localesRoute = require('./src/routes/locales.routes.js');
app.use('/api', localesRoute);
//ventas
//const ventasRoute= require('./src/routes/ventas.routes.js');
//app.use('/api',ventasRoute);


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