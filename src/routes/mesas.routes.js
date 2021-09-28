import {Router} from 'express';
let mesasRoute = Router();
// import controller
import{
    listMesas,
    cantidadDePisos,
    createMesas, 
    readMesas,
    updateMesas, 
    deleteMesas
} from '../controllers/mesas.controllers.js';

// create routes
mesasRoute.get('/local/:nombre/piso/:piso/mesas/', listMesas);
mesasRoute.get('/cantidad-de-pisos/local/:nombre/', cantidadDePisos);
mesasRoute.post('/mesas', createMesas);
mesasRoute.get('/mesas/:id', readMesas);
mesasRoute.put('/mesas', updateMesas);
mesasRoute.delete('/mesas/:id', deleteMesas);

// export routes
export default  mesasRoute;