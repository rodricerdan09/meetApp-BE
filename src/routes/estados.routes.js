import {Router} from 'express';
let estadosRoute = Router();

// import controller
import {
    listEstados, 
    createEstados, 
    readEstados, 
    updateEstados, 
    deleteEstados 
} from '../controllers/estados.controllers.js';

// create routes
estadosRoute.get('/estados', listEstados);
estadosRoute.post('/estados', createEstados);
estadosRoute.get('/estados/:id', readEstados);
estadosRoute.put('/estados', updateEstados);
estadosRoute.delete('/estados/:id', deleteEstados);

// export routes
export default estadosRoute;