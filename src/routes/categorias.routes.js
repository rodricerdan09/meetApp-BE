import {Router} from 'express';
let categoriasRoute = Router();

// import controller
import {
    listCategorias, 
    createCategorias, 
    readCategorias, 
    updateCategorias, 
    deleteCategorias 
} from '../controllers/categorias.controllers.js';

// create routes
categoriasRoute.get('/categorias', listCategorias);
categoriasRoute.post('/categorias', createCategorias);
categoriasRoute.get('/categorias/:id', readCategorias);
categoriasRoute.put('/categorias', updateCategorias);
categoriasRoute.delete('/categorias/:id', deleteCategorias);

// export routes
export default  categoriasRoute;