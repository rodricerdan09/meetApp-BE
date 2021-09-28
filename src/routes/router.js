//////////////////////// IMPORTS ///////////////////////////////
import {Router} from 'express';
////////////////////// ROUTER //////////////////////////////////

const router = Router();

//locales
import localesRoute from './locales.routes.js';
router.use('/api', localesRoute);

 //categorias
import categoriasRoute from './categorias.routes.js';
router.use('/api', categoriasRoute);

//mesas
import mesasRoute from './mesas.routes.js';
router.use('/api', mesasRoute);

//comensales
import comensalesRoute from './comensales.routes.js';
router.use('/api', comensalesRoute);

//reservas
import  reservasRoute from './reservas.routes.js';
router.use('/api', reservasRoute);

//estados (reservas)
import  estadosRoute from './estados.routes.js';
router.use('/api', estadosRoute);

//mesas_reservas
import mesasReservasRoute from './mesas.reservas.routes.js';
router.use('/api', mesasReservasRoute);


//RUTAS DEL FRONT CON  AUTENTICACION
import usersRoute from './users.routes.js';
router.use('/api', usersRoute);

//export router
export default router;
