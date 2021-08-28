var express = require('express');
var reservasRoute = express();
// import controller
const reservasController = require('../controllers/reservas.controllers.js')

// create routes
reservasRoute.get('/', reservasController.index);
reservasRoute.get('/reservas', reservasController.list);
reservasRoute.post('/reservas', reservasController.create);
reservasRoute.get('/reservas/:id', reservasController.read);
reservasRoute.put('/reservas', reservasController.update);
reservasRoute.delete('/reservas/:id', reservasController.delete);

// export routes
module.exports = reservasRoute;