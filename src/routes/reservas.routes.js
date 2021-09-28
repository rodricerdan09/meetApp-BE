import {Router} from'express';
let reservasRoute = Router();
// import controller
import {
    listReservas, 
    createReservas,
    readReservas,
    updateReservas,
    deleteReservas,
    pruebaReservas
} from '../controllers/reservas.controllers.js';

// create routes
reservasRoute.get('/reservas', listReservas);
reservasRoute.post('/reservas', createReservas);
reservasRoute.get('/reservas/:id', readReservas);
reservasRoute.patch('/reservas/:id', updateReservas);
reservasRoute.delete('/reservas/:id', deleteReservas);
reservasRoute.post('/prueba-insert', pruebaReservas);

// export routes
export default  reservasRoute;
