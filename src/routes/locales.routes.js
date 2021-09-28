import {Router} from 'express';
let localesRoute = Router();
// import controller
import {
    listLocales, 
    createLocales, 
    readLocales, 
    updateLocales, 
    deleteLocales, 
    disponibilidadLocales
} from '../controllers/locales.controllers.js';

// create routes

localesRoute.get('/locales', listLocales);
localesRoute.post('/locales', createLocales);
localesRoute.get('/locales/:id', readLocales);
localesRoute.put('/locales', updateLocales);
localesRoute.delete('/locales/:id', deleteLocales);
localesRoute.get('/disponibilidad/:fecha', disponibilidadLocales);

// export routes
export default localesRoute;