var express = require('express');
var comensalesRoute = express();
// import controller
const comensalesController = require('../controllers/comensales.controllers.js')

// create routes
comensalesRoute.get('/', comensalesController.index);
comensalesRoute.get('/comensales', comensalesController.list);
comensalesRoute.post('/comensales', comensalesController.create);
comensalesRoute.get('/comensales/:id', comensalesController.read);
comensalesRoute.put('/comensales', comensalesController.update);
comensalesRoute.delete('/comensales/:id', comensalesController.delete);

// export routes
module.exports = comensalesRoute;