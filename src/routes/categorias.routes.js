var express = require('express');
var categoriasRoute = express();
// import controller
const categoriasController = require('../controllers/categorias.controllers.js')

// create routes
categoriasRoute.get('/', categoriasController.index);
categoriasRoute.get('/categorias', categoriasController.list);
categoriasRoute.post('/categorias', categoriasController.create);
categoriasRoute.get('/categorias/:id', categoriasController.read);
categoriasRoute.put('/categorias', categoriasController.update);
categoriasRoute.delete('/categorias/:id', categoriasController.delete);

// export routes
module.exports = categoriasRoute;