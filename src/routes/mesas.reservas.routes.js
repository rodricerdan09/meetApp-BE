var express = require('express');
var mesasReservasRoute = express();
// import controller
const mesasReservasController = require('../controllers/mesas.reservas.controllers.js')

// create routes
mesasReservasRoute.get('/', mesasReservasController.index);
mesasReservasRoute.get('/mesas-reservas', mesasReservasController.list);
mesasReservasRoute.post('/mesas-reservas', mesasReservasController.create);
mesasReservasRoute.get('/mesas-reservas/:id', mesasReservasController.read);
mesasReservasRoute.put('/mesas-reservas', mesasReservasController.update);
mesasReservasRoute.delete('/mesas-reservas/:id', mesasReservasController.delete);

// export routes
module.exports = mesasReservasRoute;