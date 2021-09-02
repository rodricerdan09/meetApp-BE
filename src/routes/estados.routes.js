var express = require('express');
var estadosRoute = express();
// import controller
const estadosController = require('../controllers/estados.controllers.js')

// create routes
estadosRoute.get('/', estadosController.index);
estadosRoute.get('/estados', estadosController.list);
estadosRoute.post('/estados', estadosController.create);
estadosRoute.get('/estados/:id', estadosController.read);
estadosRoute.put('/estados', estadosController.update);
estadosRoute.delete('/estados/:id', estadosController.delete);

// export routes
module.exports = estadosRoute;