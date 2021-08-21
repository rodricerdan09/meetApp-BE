var express = require('express');
var mesasRoute = express();
// import controller
const mesasController = require('../controllers/mesas.controllers.js')

// create routes
mesasRoute.get('/', mesasController.index);
mesasRoute.get('/mesas', mesasController.list);
mesasRoute.post('/mesas', mesasController.create);
mesasRoute.get('/mesas/:id', mesasController.read);
mesasRoute.put('/mesas', mesasController.update);
mesasRoute.delete('/mesas/:id', mesasController.delete);

// export routes
module.exports = mesasRoute;