var express = require('express');
var localesRoute = express();
// import controller
const localesController = require('../controllers/locales.controllers.js')

// create routes
localesRoute.get('/', localesController.index);
localesRoute.get('/locales', localesController.list);
localesRoute.post('/locales', localesController.create);
localesRoute.get('/locales/:id', localesController.read);
localesRoute.put('/locales', localesController.update);
localesRoute.delete('/locales/:id', localesController.delete);
localesRoute.get('/disponibilidad', localesController.disponibilidad);
// export routes
module.exports = localesRoute;