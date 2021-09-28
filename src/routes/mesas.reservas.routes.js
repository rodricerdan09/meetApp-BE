import {Router} from 'express';
let mesasReservasRoute = Router();
// import controller
import { 
    listMesasReservas,
    createMesasReservas,
    readMesasReservas,
    updateMesasReservas,
    deleteMesasReservas
} from '../controllers/mesas.reservas.controllers.js';

// create routes
mesasReservasRoute.get('/mesas-reservas', listMesasReservas);
mesasReservasRoute.post('/mesas-reservas', createMesasReservas);
mesasReservasRoute.get('/mesas-reservas/:id', readMesasReservas);
mesasReservasRoute.put('/mesas-reservas', updateMesasReservas);
mesasReservasRoute.delete('/mesas-reservas/:id', deleteMesasReservas);

// export routes
export default  mesasReservasRoute;