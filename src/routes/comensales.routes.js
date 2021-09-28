import {Router} from 'express';
let comensalesRoute = Router();
// import controller
import {
    listComensales,
    createComensales, 
    readComensales,
    updateComensales,
    deleteComensales
} from '../controllers/comensales.controllers.js';

// create routes
comensalesRoute.get('/comensales', listComensales);
comensalesRoute.post('/comensales', createComensales);
comensalesRoute.get('/comensales/:id', readComensales);
comensalesRoute.put('/comensales', updateComensales);
comensalesRoute.delete('/comensales/:id', deleteComensales);

// export routes
export default comensalesRoute;