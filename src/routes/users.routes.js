import {Router} from 'express';
let usersRoute = Router();
// import controller
import {createUsers} from '../controllers/users.controllers.js';
import checkJwt from '../auth/auth.js';
// create routes
usersRoute.get('/private', checkJwt, createUsers);
usersRoute.get('/public', (req, res) => 
    res.json({message: 'Hello from a public endpoint!'})
);

// export routes
export default usersRoute;